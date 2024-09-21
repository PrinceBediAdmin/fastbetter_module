import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

const getISODateForDay = (day, offsetDays = 0) => {
  if (!(day instanceof Date)) {
    throw new Error('Invalid date provided');
  }

  const date = new Date(day);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString(); // Returns YYYY-MM-DD
};

const calculateAverageHeartRate = results => {
  if (!results || results.length === 0) return 0;

  const totalHeartRate = results.reduce(
    (acc, item) => acc + (item.value || 0),
    0,
  );
  return totalHeartRate / results.length;
};

export const fetchDailyDistanceData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const distanceMap = new Map();

  const fetchForDay = day => {
    const isoDate = getISODateForDay(day);
    if (!isoDate) {
      console.error('Invalid ISO date returned:', isoDate);
      return Promise.reject(new Error('Invalid ISO date'));
    }

    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getDailyDistanceWalkingRunningSamples(
        options,
        (err, results) => {
          if (err) {
            console.log(`Error fetching data for ${isoDate}: `, err);
            reject(err);
            return;
          }

          const dateStr = isoDate.substring(0, 10); // YYYY-MM-DD format

          if (results?.[0]?.value) {
            if (!distanceMap.has(dateStr)) {
              distanceMap.set(dateStr, {
                startTime: results?.[0]?.startDate
                  ? new Date(results?.[0]?.startDate).toISOString()
                  : null,
                endTime: results?.[0]?.endDate
                  ? new Date(results?.[0]?.endDate).toISOString()
                  : null,
                distance: {
                  inKilometers: results?.[0]?.value
                    ? results?.[0]?.value / 1000
                    : 0,
                },
                metadata: {
                  lastModifiedTime: results?.[0]?.endDate
                    ? new Date(results?.[0]?.endDate).toISOString()
                    : null,
                },
              });
            } else {
              // Update the distance for an existing entry
              const existingEntry = distanceMap.get(dateStr);
              existingEntry.distance.inKilometers += results?.[0]?.value
                ? results?.[0]?.value / 1000
                : 0; // Accumulate distance
            }
          }

          resolve();
        },
      );
    });
  };

  const promises = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    promises.push(fetchForDay(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return Promise.all(promises)
    .then(() => {
      const resultsArray = Array.from(distanceMap.values()); // Convert the map values to an array
      return resultsArray;
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      throw error;
    });
};

export const fetchDailyStepsData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated results
  const stepMap = new Map();

  const fetchForDay = day => {
    let options = {
      date: getISODateForDay(day),
    };

    return new Promise(async (resolve, reject) => {
      await AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log('Error fetching step count data: ', err);
          reject(err);
          return;
        }

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format

        if (results?.value) {
          if (!stepMap.has(dateStr)) {
            // If there's no entry for the date yet, create a new one
            stepMap.set(dateStr, {
              startTime: results?.startDate
                ? new Date(results?.startDate).toISOString()
                : null,
              endTime: results?.endDate
                ? new Date(results?.endDate).toISOString()
                : null,
              count: results?.value || 0, // Step count for the day
            });
          } else {
            // If an entry for the date exists, update the count
            const existingEntry = stepMap.get(dateStr);
            existingEntry.count += results?.value || 0;
          }
        }

        resolve();
      });
    });
  };

  // Create a list of promises for each day
  const promises = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    // Push a new promise for fetching data for the current date
    promises.push(fetchForDay(new Date(currentDate)));

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Resolve all the promises and return stepResults
  return Promise.all(promises)
    .then(() => {
      // Convert the map values to an array
      return Array.from(stepMap.values());
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      throw error;
    });
};

export const fetchDailyHeartRateData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated heart rate results
  const heartRateMap = new Map();

  const fetchForDay = day => {
    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
      includeManuallyAdded: false,
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getHeartRateSamples(options, (err, results) => {
        if (err) {
          console.log('Error fetching heart rate data: ', err);
          reject(err);
          return;
        }

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format

        if (results[0]?.value) {
          if (!heartRateMap.has(dateStr)) {
            // If there's no entry for the date yet, create a new one
            heartRateMap.set(dateStr, {
              startTime: results[0]?.startDate
                ? new Date(results[0]?.startDate).toISOString()
                : null,
              endTime: results[0]?.endDate
                ? new Date(results[0]?.endDate).toISOString()
                : null,
              metadata: {
                lastModifiedTime: results[0]?.endDate
                  ? new Date(results[0]?.endDate).toISOString()
                  : null,
              },
              samples: [
                {
                  beatsPerMinute: results[0]?.value || 0,
                },
              ],
            });
          } else {
            // If an entry for the date exists, update the average heart rate
            const existingEntry = heartRateMap.get(dateStr);
            existingEntry.avgHeartRate += calculateAverageHeartRate(results);
          }
        }
        //metadata?.lastModifiedTime
        resolve();
      });
    });
  };

  // Iterate over each day in the range and fetch data
  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  // Resolve all the promises and return heart rate results
  return Promise.all(promises)
    .then(() => {
      // Convert the map values to an array
      return Array.from(heartRateMap.values());
    })
    .catch(error => {
      console.error('Error fetching heart rate data: ', error);
      throw error;
    });
};

export const fetchDailyBloodPressureData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated results
  const bloodPressureMap = new Map();

  const fetchForDay = day => {
    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
      includeManuallyAdded: false,
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getBloodPressureSamples(options, (err, results) => {
        if (err) {
          console.log('Error fetching blood pressure data: ', err);
          reject(err);
          return;
        }
        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format
        if (results?.[0]?.bloodPressureDiastolicValue) {
          if (!bloodPressureMap.has(dateStr)) {
            bloodPressureMap.set(dateStr, {
              time: results?.[0]?.startDate
                ? new Date(results[0].startDate).toISOString()
                : null,
              metadata: {
                lastModifiedTime: results?.[0]?.endDate
                  ? new Date(results[0].endDate).toISOString()
                  : null,
              },
              systolic: {
                inMillimetersOfMercury:
                  results?.[0]?.bloodPressureSystolicValue || 0,
              },
              diastolic: {
                inMillimetersOfMercury:
                  results?.[0]?.bloodPressureDiastolicValue || 0,
              },
            });
          }
        }

        resolve();
      });
    });
  };

  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  return Promise.all(promises)
    .then(() => {
      return Array.from(bloodPressureMap.values());
    })
    .catch(error => {
      console.error('Error fetching blood pressure data: ', error);
      throw error;
    });
};

export const fetchDailyWeightData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated results
  const weightMap = new Map();

  const fetchForDay = day => {
    const isoDate = getISODateForDay(day);

    if (!isoDate) {
      console.error('Invalid ISO date returned:', isoDate);
      return Promise.reject(new Error('Invalid ISO date'));
    }

    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getWeightSamples(options, (err, results) => {
        if (err) {
          console.log('Error fetching weight data: ', err);
          reject(err);
          return;
        }
        const dateStr = isoDate.substring(0, 10); // YYYY-MM-DD format
        if (results[0]?.value) {
          if (!weightMap.has(dateStr)) {
            weightMap.set(dateStr, {
              time: results[0]?.startDate
                ? new Date(results[0]?.startDate).toISOString()
                : null,
              weight: {
                inKilograms: Math.round(results[0]?.value * 0.45) || 0,
              },
              metadata: {
                lastModifiedTime: results[0]?.startDate
                  ? new Date(results[0]?.startDate).toISOString()
                  : null,
              },
            });
          }
        }
        resolve();
      });
    });
  };

  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  return Promise.all(promises)
    .then(() => {
      return Array.from(weightMap.values());
    })
    .catch(error => {
      console.error('Error fetching weight data: ', error);
      throw error;
    });
};

export const fetchDailyActiveEnergyData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated results
  const activeEnergyMap = new Map();

  const fetchForDay = day => {
    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
        if (err) {
          console.log('Error fetching active energy data: ', err);
          reject(err);
          return;
        }

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format
        if (results?.[0]?.value) {
          if (!activeEnergyMap.has(dateStr)) {
            activeEnergyMap.set(dateStr, {
              startTime: results?.[0]?.startDate
                ? new Date(results[0].startDate).toISOString()
                : null,
              endTime: results[0]?.endDate
                ? new Date(results[0]?.endDate).toISOString()
                : null,
              energy: {
                inKilocalories: results?.[0]?.value || 0,
              },
              metadata: {
                lastModifiedTime: results[0]?.endDate
                  ? new Date(results[0]?.endDate).toISOString()
                  : null,
              },
            });
          }
        }
        resolve();
      });
    });
  };

  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  return Promise.all(promises)
    .then(() => {
      return Array.from(activeEnergyMap.values());
    })
    .catch(error => {
      console.error('Error fetching active energy data: ', error);
      throw error;
    });
};

export const fetchDailyRestingHeartRateData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated results
  const restingHeartRateMap = new Map();

  const fetchForDay = day => {
    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
      includeManuallyAdded: false,
    };
    //  date: getISODateForDay(day),

    return new Promise((resolve, reject) => {
      // Use the correct method for fetching heart rate samples
      AppleHealthKit.getRestingHeartRateSamples(options, (err, results) => {
        if (err) {
          console.log('Error fetching resting heart rate data: ', err);
          reject(err);
          return;
        }

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format
        if (results.length > 0) {
          // Calculate average resting heart rate for the day
          const totalHeartRate = results.reduce(
            (sum, item) => sum + item.value,
            0,
          );
          const averageHeartRate = totalHeartRate / results.length;

          restingHeartRateMap.set(dateStr, {
            startTime: results[0]?.startDate
              ? new Date(results[0].startDate).toISOString()
              : null,
            endTime: results[results.length - 1]?.endDate
              ? new Date(results[results.length - 1].endDate).toISOString()
              : null,
            heartRate: {
              average: averageHeartRate ? Math.round(averageHeartRate) : 0,
            },
            metadata: {
              lastModifiedTime: results[results.length - 1]?.endDate
                ? new Date(results[results.length - 1].endDate).toISOString()
                : null,
            },
          });
        }
        resolve();
      });
    });
  };

  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  return Promise.all(promises)
    .then(() => {
      return Array.from(restingHeartRateMap.values());
    })
    .catch(error => {
      console.error('Error fetching resting heart rate data: ', error);
      throw error;
    });
};

export const fetchDailySleepData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // A map to store the aggregated results
  const sleepMap = new Map();

  const fetchForDay = day => {
    let options = {
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
      includeManuallyAdded: false,
    };
    //  date: getISODateForDay(day),

    return new Promise((resolve, reject) => {
      // Use the correct method for fetching heart rate samples
      AppleHealthKit.getSleepSamples(options, (err, results) => {
        if (err) {
          console.log('Error fetching resting heart rate data: ', err);
          reject(err);
          return;
        }

        console.log(results);

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format
        if (results.length > 0) {
          // Calculate average resting heart rate for the day
          const totalHeartRate = results.reduce(
            (sum, item) => sum + item.value,
            0,
          );

          sleepMap.set(dateStr, {
            startTime: results[0]?.startDate
              ? new Date(results[0].startDate).toISOString()
              : null,
            endTime: results[results.length - 1]?.endDate
              ? new Date(results[results.length - 1].endDate).toISOString()
              : null,
            value: results[0]?.value,
            metadata: {
              lastModifiedTime: results[results.length - 1]?.endDate
                ? new Date(results[results.length - 1].endDate).toISOString()
                : null,
            },
          });
        }
        resolve();
      });
    });
  };

  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  return Promise.all(promises)
    .then(() => {
      return Array.from(sleepMap.values());
    })
    .catch(error => {
      console.error('Error fetching resting heart rate data: ', error);
      throw error;
    });
};

export const getAppleHealthData = async () => {
  const StartValue = '2024-08-25T03:43:54.898Z';
  const endValue = new Date().toISOString();

  try {
    const [
      distanceResult,
      stepsResult,
      heartRateResult,
      bloodPressureResult,
      weightResult,
      activeEnergyResult,
      RestingHeartRate,
    ] = await Promise.all([
      fetchDailyDistanceData(StartValue, endValue),
      fetchDailyStepsData(StartValue, endValue),
      fetchDailyHeartRateData(StartValue, endValue),
      fetchDailyBloodPressureData(StartValue, endValue),
      fetchDailyWeightData(StartValue, endValue),
      fetchDailyActiveEnergyData(StartValue, endValue),
      fetchDailyRestingHeartRateData(StartValue, endValue),
    ]);

    const HealthData = [
      {id: 'stepsResult', data: stepsResult},
      {id: 'totalCaloriesBurnedResult', data: null},
      {id: 'heartRateResult', data: heartRateResult},
      {id: 'distanceResult', data: distanceResult},
      {id: 'sleepSessionResult', data: null},
      {id: 'weightResult', data: weightResult},
      {id: 'heightResult', data: null},
      {id: 'BloodPressureResult', data: bloodPressureResult},
      {id: 'ActiveCaloriesBurned', data: activeEnergyResult},
      {id: 'Nutrition', data: activeEnergyResult},
      {id: 'RestingHeartRate', data: RestingHeartRate},
    ];

    return HealthData;
  } catch (error) {
    console.error('Error fetching Apple Health data: ', error);
  }
};
