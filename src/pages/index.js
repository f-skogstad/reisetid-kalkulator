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
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('TRANSIT');
  const [map, setMap] = useState(null);

  const destiantionRef = useRef();
  const originRef1 = useRef();
  const originRef2 = useRef();
  const originRef3 = useRef();

  let originRefs = [originRef1, originRef2, originRef3];

  function calculateRoute() {
    let calculatedDistance = 0;
    let calculartedDuration = 0;
    if (
      originRef1.current.value === '' ||
      destiantionRef.current.value === ''
    ) {
      return;
    }

    originRefs.map(async (originRef) => {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        travelMode: travelMode,
      });

      // setDirectionsResponse(results);
      calculatedDistance += results.routes[0].legs[0].distance.value;
      calculartedDuration += results.routes[0].legs[0].duration.value;
      setDistance(parseInt(calculatedDistance / 1000));
      setDuration(parseInt(calculartedDuration / 60));

      console.log(
        `Current duration: ${results.routes[0].legs[0].duration.value}`
      );
      console.log(`Total duration: ${calculartedDuration}`);
    });
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef1.current.value = 'Ladderudjordet 42, 2070 Råholt';
    originRef2.current.value = 'Kongeveien 26, 0712 Oslo';
    originRef3.current.value = 'Trollfaret 11A, 2020 Skedsmokorset';
    destiantionRef.current.value = 'Fred Olsens Gate, 0154 Oslo';
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

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

        {isLoaded && (
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
                <Autocomplete>
                  <Input type='text' placeholder='Origin' ref={originRef1} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input type='text' placeholder='Origin' ref={originRef2} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input type='text' placeholder='Origin' ref={originRef3} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    type='text'
                    placeholder='Destination'
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>

              <ButtonGroup>
                <Button
                  colorScheme='pink'
                  type='submit'
                  onClick={calculateRoute}
                >
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
              <Text>Distance: {distance} km</Text>
              <Text>Duration: {duration} minutes</Text>
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
        )}
      </Flex>
    </>
  );
}

{
  /*  */
}
