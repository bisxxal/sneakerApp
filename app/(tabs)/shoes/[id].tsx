import { Text } from '@/components/Themed'
import { shoesPropes } from '@/constants'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, View, StyleSheet } from 'react-native'

const singleShoes = () => {
  const {id}= useLocalSearchParams()
  const [list, setList] = useState<shoesPropes[]>([]); 
  const [cursize, setcursize] = useState<number>(7);
  const url = `https://snkerbackend.onrender.com`
  useEffect(() => {
      const fetchData = async () => {
          try {
          const response = await fetch(`${url}/api/shoes/list`);
          response.json().then((data) => { 
              setList(data.allShoes)
          });
          } catch (error) {}
        };
      fetchData();
    }, []);

  const shoes: shoesPropes | undefined = list.find((shoe) => shoe._id === id);
  // console.log(shoes)
  const size = [7,8,9,10,11]

  return (
    <View style={styles.container}>
          <Stack.Screen options={{title:`Shoes id ${id}` }} /> 
          <Image 
          source={{ uri: `https://snkerbackend.onrender.com/images/${shoes?.image}` }}  style={styles.image}  resizeMode="contain" />
   
        <View style={styles.textarea}> 
            <Text style={styles.htext}>{shoes?.name}</Text>
            <Text style={styles.price}>₹{shoes?.price}</Text>
            <Text style={styles.ptext}>{shoes?.description}</Text>
            </View>

              <Text style={styles.htext}>Select Size</Text>
            <View style={{flexDirection: 'row', height:60, justifyContent: 'space-between', gap: 10,}}>
            {size.map((s) => (
                <Pressable key={s} style={ [ cursize===s ? {backgroundColor:'#6d6d78'}:{ borderColor:'white' ,borderWidth:2,  } , {borderRadius:5, width:40 , height:40 ,display:'flex', justifyContent:'center' , alignItems:'center' }]} onPress={() => setcursize(s)} >
                    <Text style={styles.htext}>{s}</Text>
                </Pressable>
            ))}
            </View>

            <Pressable style={styles.button} onPress={() => alert('Added to cart')}>
                <Text style={styles.htext}>Add to Cart</Text>
            </Pressable>
    </View>
  )
}

export default singleShoes

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column', 
    height: '120%',  
    backgroundColor: '#27272A',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 9,
    gap: 5,
  },
  sdiv:{ 
      height: 220,
      width: 200,
      borderRadius: 25,
      // overflow: 'hidden',
      backgroundColor: '#27272A',
      flex: 1,
      flexDirection: 'column',
      margin: 5,
      padding:5,
      paddingHorizontal: 9,
      justifyContent: 'space-between',
      maxWidth: '50%', 
  },
  textarea:{
      backgroundColor: 'transparent',
      color: 'white' ,
  },
  htext:{
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white' ,
  },
  ptext:{
      fontSize: 15,
      fontWeight: 'normal',
      color: 'gray',
      marginBottom: 5,
  },
  price:{
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
  },
  image: {
      marginTop: 4,
      width: '100%',  
      height: 450,  
      backgroundColor: 'white', 
      borderRadius: 30,  
    },
    button:{
      backgroundColor: '#6bbce5',
      color: 'black',
      padding: 15,
     display: 'flex',
      borderRadius: 10,
      width: '100%', 
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    }
   
});