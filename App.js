import React from 'react';

import {Header} from 'react-native-elements';
import {FlatList, View,Image, Dimensions,Modal,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';


var users = require("./images.json");

var Images = [
              require('./images/img1.jpg'),
  require('./images/img2.jpg'),
  require('./images/img3.png'),
  require('./images/img4.png'),
  require('./images/img5.jpg'),
  require('./images/img6.png'),
  require('./images/img7.jpeg'),
  require('./images/img8.jpg'),
  require('./images/img9.jpg'),
  require('./images/img10.jpg'),
  require('./images/img11.jpg'),
  require('./images/img12.jpg'),
];
    

 


class AnimatedImages extends React.Component{
  render(){
    return(
      <Animatable.View 
      style={{flex:1,alignItems:'center'}}
      animation = "zoomIn"
      delay = {this.props.imageIndex*100}
      useNativeDriver={true}
      >
        {this.props.children}
      </Animatable.View>
    );
  }
}

export default class App extends React.Component{

  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      modalImage : null
    }
  }

  setModalVisible(modalVisible, image) {
    this.setState({
      isModalVisible: modalVisible,
      modalImage : image
    })
  }

  renderImage=(item)=>{
    console.log(item);
    return (<AnimatedImages imageIndex={item.index}>
      <TouchableOpacity onPress={()=>{this.setModalVisible(true,item.item)}}>
        {/* <Image source={{ uri: item.item.image }} style={{ width: Dimensions.get("window").width / 4, height: Dimensions.get("window").height / 4 }}></Image> */}
        <Image source={item.item} style={{ width: Dimensions.get("window").width / 4, height: Dimensions.get("window").height / 4 }}></Image>
      </TouchableOpacity>
    </AnimatedImages>);
  }


  render(){
    return(
      <View>
        <Header centerComponent={{ text: "Gallery", style: { fontSize: 20, fontWeight: 'bold',marginTop:10 } }}
        backgroundColor="#b34180"
        ></Header>
      <FlatList horizontal={false}
      numColumns={4}
      data={Images}
      keyExtractor={(item,index)=>index.toString()}
      renderItem = {this.renderImage}
        />
        <Modal visible={this.state.isModalVisible} transparent={true} animationType="fadein"> 
          <View style={{marginTop : 15}}>
            <Text style={{marginTop : 10,marginLeft:10}} onPress={()=>this.setModalVisible(false,null)}>Close</Text>
            {/* <Image source={{uri : this.state.modalImage}} style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}></Image> */}
          <Image source={this.state.modalImage} style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}></Image> 
          </View>
        </Modal>
      </View>
    );
  }
}