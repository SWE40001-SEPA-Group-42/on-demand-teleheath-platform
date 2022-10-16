import React, { useState } from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';

const AgeSlider = () => {
  const [sliderValue, setSliderValue] = useState(30)

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2}>
      <Slider aria-label="Age Slider" defaultValue={30} min={30} max={70} onChange={(val) => setSliderValue(val)}>
        <SliderMark value={30} {...labelStyles}>
          30
        </SliderMark>
        <SliderMark value={70} {...labelStyles}>
          70
        </SliderMark>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          color="white"
          bg="blue.500"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack bg="blue.500" />
        </SliderTrack>
        <SliderThumb boxSize={4} />
      </Slider>
    </Box>
  )
};

export default AgeSlider;