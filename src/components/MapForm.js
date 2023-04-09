import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

export default function MapForm({ setDirectionsResponse }) {
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

  return (
    <Card className='mx-auto z-1' style={{ width: '48rem' }}>
      <Card.Body>
        <Card.Title>Reisetid-kalkulator</Card.Title>

        <Form onSubmit={calculateRoute}>
          <Form.Group className='mb-5' controlId='arbeidsgiverAdresse'>
            <Form.Label>Adresse: arbeidsgiver</Form.Label>

            <Form.Control
              type='string'
              placeholder='arbeidsgivers adresse...'
              ref={destiantionRef}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='arbeidstakerAdresse'>
            <Form.Label>Adresse: arbeidstaker 1</Form.Label>
            <Form.Control
              type='string'
              placeholder='Adresse 1'
              ref={originRef1}
            />
            <Form.Label>Adresse: arbeidstaker 2</Form.Label>
            <Form.Control
              type='string'
              placeholder='Adresse 2'
              ref={originRef2}
            />
            <Form.Label>Adresse: arbeidstaker 3</Form.Label>
            <Form.Control
              type='string'
              placeholder='Adresse 3'
              ref={originRef3}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Beregn
          </Button>
          <Button variant='primary' onClick={clearRoute}>
            Tøm
          </Button>
        </Form>
        <Card.Text>Distance: {distance}</Card.Text>
        <Card.Text>Duration: {duration}</Card.Text>
      </Card.Body>
    </Card>
  );
}
