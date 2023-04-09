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

        <MapForm setDirectionsResponse={setDirectionsResponse} />
      </Flex>
    </>
  );
}

{
  /* <Box
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
                <Input type='text' placeholder='Origin' ref={originRef} />
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
              <Button colorScheme='pink' type='submit' onClick={() => {}}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={() => {}}
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
        </Box> */
}
