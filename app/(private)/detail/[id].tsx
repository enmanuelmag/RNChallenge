/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
import { Separator, Text, View, XStack, YStack } from 'tamagui';
import { Stack, useLocalSearchParams } from 'expo-router';

import DataRepo from '@api/datasource';

import { PokemonDetailType } from '@customTypes/pokemon';

import QKeys from '@constants/reactAPI';
import { blurhash } from '@constants/image';

import { capitalize } from '@utils/string';
import { ErrorService } from '@utils/errors';
import { isLoadingRefetchQuery } from '@utils/network';

import Logo from '@components/shared/logo';
import LoaderText from '@components/shared/loaderText';
import GradientList from '@components/shared/gradientList';
import DismissKeyboardHOC from '@components/shared/dismissKeyboardHOC';
import AudioButton from '@components/shared/audioButton';

const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const pokemonDetailQuery = useQuery<PokemonDetailType, ErrorService, PokemonDetailType, string[]>(
    {
      enabled: !!id,
      queryKey: [QKeys.GET_POKEMON_DETAIL_KEY, id],
      queryFn: async ({ queryKey }) => {
        const [, idParam] = queryKey;
        const budget = await DataRepo.getPokemonDetail({ id: idParam });
        return budget;
      },
    },
  );

  if (isLoadingRefetchQuery(pokemonDetailQuery)) {
    return (
      <View className="cd-h-full cd-flex cd-flex-col cd-justify-center">
        <Stack.Screen
          options={{
            headerTitle: () => <Logo colored="Detail" normal="Poke" />,
          }}
        />
        <LoaderText text="Loading pokemon" />
      </View>
    );
  }

  const { data } = pokemonDetailQuery;

  return (
    <DismissKeyboardHOC>
      <GradientList>
        <YStack className="cd-h-full" gap="$3" padding="$3">
          <XStack justifyContent="space-between">
            <YStack gap="$1">
              <Text className="cd-text-gray-900 cd-text-xl cd-font-bold dark:cd-text-gray-100 cd-mb-[8]">
                {capitalize(data?.name)}
              </Text>
              <Text className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400">
                Types: {data?.types.map((t) => capitalize(t.type.name)).join(', ')}
              </Text>
              <Text className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400">
                Height: {data?.height}, Weight: {data?.weight}
              </Text>
            </YStack>
            {data?.sprites.front_default && (
              <Image
                className="cd-w-full"
                contentFit="contain"
                placeholder={{ blurhash }}
                source={{ uri: data?.sprites.front_default }}
                transition={750}
              />
            )}
          </XStack>

          <Separator className="cd-mt-[8]" />

          <YStack gap="$1">
            <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-300 cd-font-semibold">
              Abilities
            </Text>
            {data?.abilities.map((a) => (
              <Text
                className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400"
                key={a.ability.name}
              >
                {capitalize(a.ability.name)}
              </Text>
            ))}
          </YStack>

          <Separator className="cd-mt-[8]" />

          <YStack gap="$1">
            <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-300 cd-font-semibold">
              Stats
            </Text>
            {data?.stats.map((s) => (
              <Text
                className="cd-text-base cd-text-gray-500 dark:cd-text-gray-400"
                key={s.stat.name}
              >
                {capitalize(s.stat.name)}: {s.base_stat}
              </Text>
            ))}
          </YStack>

          <Separator className="cd-mt-[8]" />

          {data?.cries.latest && (
            <AudioButton
              classes="cd-mt-[8]"
              text="Play latest pokemon cry"
              url={data?.cries.latest}
            />
          )}

          {data?.cries.legacy && (
            <AudioButton
              classes="cd-mt-[8]"
              text="Play legacy pokemon cry"
              url={data?.cries.legacy}
            />
          )}

          {(data?.cries.legacy || data?.cries.latest) && <Separator className="cd-mt-[8]" />}
        </YStack>
      </GradientList>
    </DismissKeyboardHOC>
  );
};

export default DetailScreen;
