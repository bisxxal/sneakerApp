import { FlatList } from 'react-native'; 
import NewArivals from '@/components/NewArivals'; 
import { useStore } from '@/context/StroeContext';

export default function TabOneScreen() {
  const storeContext = useStore();
  if (!storeContext) {
    return null;  
  }
  const { url, list } = storeContext;
  
  return ( 
       <FlatList
            data={list} 
            renderItem={({item}) => (
              <NewArivals item={item} url={url} />
            )}
            numColumns={2}
            contentContainerStyle={{backgroundColor: '#18181B'}}
        /> 
  );
}

