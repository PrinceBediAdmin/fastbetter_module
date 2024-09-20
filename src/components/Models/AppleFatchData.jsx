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

  // A map to store the aggregated results
  const distanceMap = new Map();

  const fetchForDay = day => {
    let options = {
      unit: 'mile',
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
      includeManuallyAdded: false,
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
        if (err) {
          console.log('Error fetching walking/running data: ', err);
          reject(err);
          return;
        }

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format

        if (!distanceMap.has(dateStr)) {
          // If there's no entry for the date yet, create a new one
          distanceMap.set(dateStr, {
            startTime: results?.startDate
              ? new Date(results?.startDate).toISOString()
              : null,
            endTime: results?.endDate
              ? new Date(results?.endDate).toISOString()
              : null,
            count: results?.value || 0, // Distance in miles/meters
          });
        } else {
          // If an entry for the date exists, update the count
          const existingEntry = distanceMap.get(dateStr);
          existingEntry.count += results?.value || 0;
        }

        resolve();
      });
    });
  };

  // Iterate over each day in the range and fetch data
  const promises = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    promises.push(fetchForDay(new Date(d)));
  }

  // Resolve all the promises and return distanceResults
  return Promise.all(promises)
    .then(() => {
      // Convert the map values to an array
      return Array.from(distanceMap.values());
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
      startDate: getISODateForDay(day), // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
    };

    return new Promise(async (resolve, reject) => {
      await AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          console.log('Error fetching step count data: ', err);
          reject(err);
          return;
        }

        const dateStr = getISODateForDay(day).substring(0, 10); // YYYY-MM-DD format

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

        if (!heartRateMap.has(dateStr)) {
          // If there's no entry for the date yet, create a new one
          heartRateMap.set(dateStr, {
            startTime: results?.startDate
              ? new Date(results?.startDate).toISOString()
              : null,
            endTime: results?.endDate
              ? new Date(results?.endDate).toISOString()
              : null,
            avgHeartRate: calculateAverageHeartRate(results), // Average heart rate
          });
        } else {
          // If an entry for the date exists, update the average heart rate
          const existingEntry = heartRateMap.get(dateStr);
          existingEntry.avgHeartRate += calculateAverageHeartRate(results);
        }

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

        if (!bloodPressureMap.has(dateStr)) {
          bloodPressureMap.set(dateStr, {
            startTime: results?.[0]?.startDate
              ? new Date(results[0].startDate).toISOString()
              : null,
            endTime: results?.[0]?.endDate
              ? new Date(results[0].endDate).toISOString()
              : null,
            systolic: results?.[0]?.systolic || 0, // Systolic pressure
            diastolic: results?.[0]?.diastolic || 0, // Diastolic pressure
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
      startDate: isoDate, // Start of the day
      endDate: getISODateForDay(day, 1), // End of the day (next day, midnight)
    };

    return new Promise((resolve, reject) => {
      AppleHealthKit.getLatestWeight(options, (err, results) => {
        if (err) {
          console.log('Error fetching weight data: ', err);
          reject(err);
          return;
        }

        const dateStr = isoDate.substring(0, 10); // YYYY-MM-DD format

        if (!weightMap.has(dateStr)) {
          weightMap.set(dateStr, {
            time: results?.startDate
              ? new Date(results?.startDate).toISOString()
              : null,
            weight: {
              inKilograms: results?.value || 0, // Weight in kg
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

        if (!activeEnergyMap.has(dateStr)) {
          activeEnergyMap.set(dateStr, {
            startTime: results?.[0]?.startDate
              ? new Date(results[0].startDate).toISOString()
              : null,
            energyBurned: results?.[0]?.value || 0, // Active energy in kcal
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
      return Array.from(activeEnergyMap.values());
    })
    .catch(error => {
      console.error('Error fetching active energy data: ', error);
      throw error;
    });
};

export const getAppleHealthData = async () => {
  const StartValue = '2024-08-25T03:43:54.898Z';
  const endValue = new Date().toISOString();

  const filteredDistanceResult = [];
  const filteredActiveEnergyResult = [];
  const filteredHeartRateDate = [];
  const filteredWeightData = [];

  try {
    const [
      distanceResult,
      stepsResult,
      heartRateResult,
      bloodPressureResult,
      weightResult,
      activeEnergyResult,
    ] = await Promise.all([
      fetchDailyDistanceData(StartValue, endValue),
      fetchDailyStepsData(StartValue, endValue),
      fetchDailyHeartRateData(StartValue, endValue),
      fetchDailyBloodPressureData(StartValue, endValue),
      fetchDailyWeightData(StartValue, endValue),
      fetchDailyActiveEnergyData(StartValue, endValue),
    ]);

    distanceResult.forEach(item => {
      const date = item?.startTime.substring(0, 10); // YYYY-MM-DD format
      if (
        !filteredDistanceResult.find(existingItem =>
          existingItem.startTime.startsWith(date),
        )
      ) {
        filteredDistanceResult.push(item);
      }
    });

    weightResult.forEach(item => {
      const date = item?.time.substring(0, 10); // YYYY-MM-DD format
      if (
        !filteredWeightData.find(existingItem =>
          existingItem.time.startsWith(date),
        )
      ) {
        filteredWeightData.push(item);
      }
    });

    const HealthData = [
      {id: 'stepsResult', data: stepsResult},
      {id: 'totalCaloriesBurnedResult', data: null},
      {id: 'heartRateResult', data: heartRateResult},
      {id: 'distanceResult', data: distanceResult},
      {id: 'sleepSessionResult', data: null},
      {id: 'weightResult', data: filteredWeightData},
      {id: 'heightResult', data: null},
      {id: 'BloodPressureResult', data: bloodPressureResult},
      {id: 'ActiveCaloriesBurned', data: activeEnergyResult},
      {id: 'Nutrition', data: null},
    ];

    // console.log(stepsResult);

    return HealthData;
  } catch (error) {
    console.error('Error fetching Apple Health data: ', error);
  }
};
