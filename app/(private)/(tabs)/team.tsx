import React from 'react';
import { Text, YStack } from 'tamagui';

const Team = () => {
  return (
    <YStack
      className="cd-bg-white cd-h-full cd-pt-[12] cd-pb-[24] dark:cd-bg-black"
      justifyContent="space-between"
      padding="$4"
    >
      <Text className="cd-font-bold cd-text-black">Team</Text>
    </YStack>
  );
};

export default Team;
