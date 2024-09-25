import React, {useState} from 'react';
import {View, Button, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';

const fitbitOAuthConfig = {
  clientId: '23PMG8',
  clientSecret: '22f1f5b091aa499824348a7ce98986ef',
  redirectUrl: 'https://fastbetter.com/', // Replace with your redirect URI
  scopes: 'activity nutrition sleep heartrate profile', // Space-separated string for scopes
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

const FitbitOAuthWebView = ({onAuthSuccess, onAuthError}) => {
  const [loading, setLoading] = useState(true);

  const handleWebViewNavigationStateChange = navState => {
    const {url} = navState;

    // Check if the URL contains the authorization code
    if (url.startsWith(fitbitOAuthConfig.redirectUrl)) {
      const code = getQueryParameter(url, 'code');
      if (code) {
        // Exchange authorization code for access token
        exchangeCodeForToken(code);

        console.log(code);
      }
    }
  };

  // Function to extract query parameters from URL
  const getQueryParameter = (url, parameterName) => {
    const queryString = url.split('?')[1]; // Get the part after the '?'
    const params = queryString.split('&'); // Split by '&' to get each parameter
    for (const param of params) {
      const [key, value] = param.split('='); // Split each parameter by '='
      if (key === parameterName) {
        return decodeURIComponent(value); // Return the decoded value
      }
    }
    return null;
  };

  const exchangeCodeForToken = async code => {
    try {
      const postData = new URLSearchParams({
        client_id: fitbitOAuthConfig.clientId,
        grant_type: 'authorization_code',
        redirect_uri: fitbitOAuthConfig.redirectUrl,
        response_type: code,
      }).toString();

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23PMG8&redirect_uri=https://fastbetter.com/&scope=activity%20nutrition%20sleep%20heartrate%20profile\n',
        headers: {
          Cookie:
            'JSESSIONID=87BDF06B5ADBFA24C5EA4DAF9247B4F7.fitbit1; fct=c935bb785f874d278244ff7faada80dd',
        },
      };

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          const {access_token} = response.data;
          console.log('Access Token:', access_token);
          onAuthSuccess(access_token);
        })
        .catch(error => {
          console.log(error);
        });

      // const response = await axios.post(1
      //   fitbitOAuthConfig.serviceConfiguration.tokenEndpoint,
      //   postData,
      //   {
      //     headers: {
      //       Authorization: `Basic ${base64Encode(
      //         `${fitbitOAuthConfig.clientId}:${fitbitOAuthConfig.clientSecret}`,
      //       )}`,
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //   },
      // );

      // const {access_token} = response.data;
      // console.log('Access Token:', access_token);
      // onAuthSuccess(access_token);
    } catch (error) {
      console.error('Error fetching access token:', error.response.data);
      onAuthError(error);
    }
  };

  const base64Encode = str => {
    let output = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let i = 0;

    while (i < str.length) {
      const byte1 = str.charCodeAt(i++) & 0xff;
      const byte2 = str.charCodeAt(i++) & 0xff;
      const byte3 = str.charCodeAt(i++) & 0xff;

      const enc1 = byte1 >> 2;
      const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
      const enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
      const enc4 = byte3 & 63;

      if (isNaN(byte2)) {
        enc3 = enc4 = 64; // padding
      } else if (isNaN(byte3)) {
        enc4 = 64; // padding
      }

      output +=
        chars.charAt(enc1) +
        chars.charAt(enc2) +
        chars.charAt(enc3) +
        chars.charAt(enc4);
    }

    return output;
  };

  return (
    <View style={{flex: 1}}>
      {loading && (
        <ActivityIndicator
          size="large"
          style={{position: 'absolute', top: '50%', left: '50%'}}
        />
      )}
      <WebView
        source={{
          uri: `${fitbitOAuthConfig.serviceConfiguration.authorizationEndpoint}?response_type=code&client_id=${fitbitOAuthConfig.clientId}&redirect_uri=${fitbitOAuthConfig.redirectUrl}&scope=${fitbitOAuthConfig.scopes}`,
        }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onLoad={() => setLoading(false)}
      />
    </View>
  );
};

const FitbitIntegration = () => {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const handleAuthSuccess = token => {
    setAccessToken(token);
    setIsWebViewVisible(false);
  };

  const handleAuthError = error => {
    console.error('OAuth error:', error);
    setIsWebViewVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      {isWebViewVisible && (
        <FitbitOAuthWebView
          onAuthSuccess={handleAuthSuccess}
          onAuthError={handleAuthError}
        />
      )}
      <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
        {!isWebViewVisible && (
          <Button
            title="Connect Fitbit"
            onPress={() => setIsWebViewVisible(true)}
          />
        )}
      </View>
    </View>
  );
};

export default FitbitIntegration;
