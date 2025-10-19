import axios from 'axios';

interface UseInfoProps {
  latitude: number;
  longitude: number;
}

export const getUserInfo = async ({ latitude, longitude }: UseInfoProps) => {
  console.log('Fetching user info for:', latitude, longitude); // 👀
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_OPENCAGE_API_KEY');
  }

  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;
  const { data } = await axios.get(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
