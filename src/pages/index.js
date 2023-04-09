import { useRef, useState } from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import MapForm from '../components/MapForm';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const center = { lat: 59.910789, lng: 10.74989 };

export default function Home() {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [travelMode, setTravelMode] = useState('TRANSIT');

  const destiantionRef = useRef();
  const originRef1 = useRef();
  const originRef2 = useRef();
  const originRef3 = useRef();

  async function calculateRoute() {
    if (
      originRef1.current.value === '' ||
      destiantionRef.current.value === ''
    ) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef1.current.value,
      destination: destiantionRef.current.value,
      travelMode: travelMode,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef1.current.value = '';
    originRef2.current.value = '';
    originRef3.current.value = '';
    destiantionRef.current.value = '';
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  return (
    <>
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        bgColor='blue.200'
        h='100vh'
        w='100vw'
      >
        {isLoaded && (
          <Box position='absolute' left={0} top={0} h='100%' w='100%'>
            {/* Google Map Box */}
            <GoogleMap
              center={center}
              zoom={10}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Box>
        )}

        {/* <MapForm setDirectionsResponse={setDirectionsResponse} /> */}
        <Box
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='1'
        >
          <HStack spacing={2} justifyContent='space-between'>
            <Box flexGrow={1}>
              <div>
                <Input type='text' placeholder='Origin' ref={originRef1} />
              </div>
            </Box>
            <Box flexGrow={1}>
              <div>
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                />
              </div>
            </Box>

            <ButtonGroup>
              <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            />
          </HStack>
        </Box>
      </Flex>
    </>
  );
}

{
  /*  */
}
