import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoviesListScreen, MovieDetailScreen } from '../screens/Movies';
import { RootStackParamList } from './types';
import { screens } from '../utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
        contentStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Stack.Screen
        name={screens.movies.moviesList}
        component={MoviesListScreen}
        options={{
          title: 'Cartelera de Películas',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={screens.movies.movieDetail}
        component={MovieDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}