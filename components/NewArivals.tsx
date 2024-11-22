import { Image, Pressable, StyleSheet } from 'react-native'; 
import { Text, View } from './Themed' 
import { Link } from 'expo-router';

const defimge = 'https://snkerbackend.onrender.com/images/17174194596222_3cad2f96-8f31-468a-a871-0f07290b01ef.webp'
const NewArivals = ({item}:any) => {
   
  return (
    <Link href={`/shoes/${item._id}`} asChild >

        <Pressable key={item._id} style={styles.sdiv}>
        <Image 
          source={{ uri: `https://snkerbackend.onrender.com/images/${item.image}` || defimge }} 
          style={styles.image} 
          resizeMode="cover" // Use this prop directly on the Image component
        />
           <View style={styles.textarea}> 
            <Text style={styles.htext}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text> 
            </View> 
    </Pressable>
    </Link>
  )
}

export default NewArivals

const styles = StyleSheet.create({
    
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
    price:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        marginTop: 4,
        width: '100%', // Make sure the image stretches to full width
        height: 120, // Set an explicit height
        backgroundColor: 'white', 
        borderRadius: 20, // Optional: To give rounded corners to the image
      },
     
  });