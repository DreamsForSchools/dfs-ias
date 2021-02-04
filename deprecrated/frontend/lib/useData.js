import useSWR from 'swr';
import {firestoreGet} from '../lib/firestoreApi'

export function useData(table_type, currentSeason, seasonList){
  const options = {
    revalidateOnFocus: false, // Change when deployed.
    shouldRetryOnError: false,
    
  };

  const { data, error, mutate } = useSWR( 
    () => [ table_type, currentSeason?currentSeason:seasonList[0] ], 
    firestoreGet, 
    options);
	return {data, error, mutate};
}
  