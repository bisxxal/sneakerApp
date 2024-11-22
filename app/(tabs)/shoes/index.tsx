import { FlatList } from 'react-native'; 
import NewArivals from '@/components/NewArivals';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [list, setList] = useState([]); 
  const url = `https://snkerbackend.onrender.com`

  useEffect(() => {
      const fetchData = async () => {
          try {
            
          const response = await fetch(`${url}/api/shoes/list`);
          response.json().then((data) => { 
              setList(data.allShoes)
          }
          );
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      fetchData();
    }, []);


  return ( 
       <FlatList
            data={list} 
            renderItem={({item}) => (
              <NewArivals item={item} />
            )}
            numColumns={2}
            contentContainerStyle={{backgroundColor: '#18181B'}}
        /> 
  );
}

