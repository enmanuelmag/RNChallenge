import React from 'react';
import { useAudioPlayer } from 'expo-audio';
import { AudioLines, Volume2 } from '@tamagui/lucide-icons';

import ButtonCustom, { colorsStyles } from './button';

type AudioButtonProps = {
  text: string;
  url: string;
  classes?: string;
  color?: keyof typeof colorsStyles;
};

const AudioButton = (props: AudioButtonProps) => {
  const { text, url, classes, color } = props;

  const player = useAudioPlayer(url);

  return (
    <ButtonCustom
      classes={classes}
      color={color}
      iconRight={player.playing ? <AudioLines /> : <Volume2 />}
      text={text}
      variant="primary"
      onPress={() => {
        if (player.playing) {
          player.pause();
        } else {
          player.play();
        }
      }}
    />
  );
};

export default AudioButton;
