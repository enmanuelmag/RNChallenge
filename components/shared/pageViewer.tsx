import React from 'react';
import { View } from 'tamagui';

import { $ } from '@utils/styles';

type PageViewerProps = {
  classes?: string;
  items: React.ReactNode[];
};

const PageViewerCustom = (props: PageViewerProps) => {
  const { classes, items } = props;

  return (
    <View className={$('cd-flex !cd-flex-wrap cd-flex-row cd-justify-evenly', classes)}>
      {items.map((item, index) => (
        <View className={$('cd-basis-1/4 cd-w-auto')} key={index}>
          {item}
        </View>
      ))}
    </View>
  );
};

export default PageViewerCustom;
