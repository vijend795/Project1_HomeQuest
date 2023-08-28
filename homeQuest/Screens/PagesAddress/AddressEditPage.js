import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView } from 'react-native';
// import { Properties } from '../../src/DataApi/AddressesData';
import { useSelector } from "react-redux";

const EditPropertyPage = ({ navigation, route }) => {
  const allPropertiesData=useSelector((state)=>{return state.allProperties})
  const selectedProperty = allPropertiesData.filter((property) => property.id === route.params.id)[0];
  const [property, setProperty] = useState(selectedProperty);

  const handleChange = (key, value) => {
    setProperty((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Perform save operation or API call here
    console.log('Property Updated:', property);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Property</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          style={styles.input}
          value={property.address.streetAddress}
          onChangeText={(text) =>
            handleChange('address', { ...property.address, streetAddress: text })
          }
          placeholder="Street Address"
        />
        <TextInput
          style={styles.input}
          value={property.address.streetName}
          onChangeText={(text) =>
            handleChange('address', { ...property.address, streetName: text })
          }
          placeholder="Street Name"
        />
        <TextInput
          style={styles.input}
          value={property.address.suburb}
          onChangeText={(text) => handleChange('address', { ...property.address, suburb: text })}
          placeholder="Suburb"
        />
        <TextInput
          style={styles.input}
          value={property.address.city}
          onChangeText={(text) => handleChange('address', { ...property.address, city: text })}
          placeholder="City"
        />
        <TextInput
          style={styles.input}
          value={property.address.country}
          onChangeText={(text) =>
            handleChange('address', { ...property.address, country: text })
          }
          placeholder="Country"
        />
        <TextInput
          style={styles.input}
          value={property.address.pinCode}
          onChangeText={(text) =>
            handleChange('address', { ...property.address, pinCode: text })
          }
          placeholder="Pin Code"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        <TextInput
          style={styles.input}
          value={property.propertyType}
          onChangeText={(text) => handleChange('propertyType', text)}
          placeholder="Property Type"
        />
        <TextInput
          style={styles.input}
          value={property.area}
          onChangeText={(text) => handleChange('area', text)}
          placeholder="Area"
        />
        <TextInput
          style={styles.input}
          value={property.price}
          onChangeText={(text) => handleChange('price', text)}
          placeholder="Price"
        />
        <TextInput
          style={styles.input}
          value={property.availableFor}
          onChangeText={(text) => handleChange('availableFor', text)}
          placeholder="Available For"
        />
        <TextInput
          style={styles.input}
          value={property.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Description"
        />
      </View>

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default EditPropertyPage;
