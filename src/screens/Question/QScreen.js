import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  Radio
} from "native-base";
import { View, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import RadioGroup from "react-native-radio-buttons-group";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import { Countdown } from 'react-native-countdown-text';
import Countdown from 'react-countdown-now';
import { setQuiz } from "../../redux/actions/actions";
import config from "../../../config";
import axios from "axios";

export default class QScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      // radio_props : [
      //   {label: 'Iya', value: 0 },
      //   {label: 'Tidak', value: 1 },
      //   {label: 'Bisa', value: 2 },
      //   {label: 'Tidak Bisa', value: 3 },
      //   {label: 'Bisa Jadi', value: 4 }
      // ],
    };
  }

  // onPress = data => this.setState({ data });
  componentDidMount(){
      axios
      .get(`${config.BASE_URL}/api/v1/questions`)
      .then(response => {
        this.setState({
          questions: response.data.data
        })
        console.log(response)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    var res = []
    var qs = this.state.questions
    for(let a = 0;a < qs.length;a++){
      let options = qs[a].options.split(",")
      res.push({
        id: qs[a].id,
        number: qs[a].number,
        description: qs[a].description,
        type: qs[a].type,
        options: options,
        answer: qs[a].answer,
        timer: qs[a].timer,
      })
    }  

    // console.log(items)
    return (
      <Container>
        <Header style={{ backgroundColor: "#00b5ec" }} >
          <Left>
            <Text style={styles.headerLeftText}>
              Question 
            </Text>
          </Left>
          <Right>
            <Text>
              <Ionicons name="md-close" size={30} color="#ffff" />
            </Text>
          </Right>
        </Header>
        <Header style={{ backgroundColor: "#5cb85c" }} >
          <View style={{marginTop: 16}}>
            <Text style={styles.textInfo}>Section 1 Of 3</Text>
          </View>
          <Body />
          <Right>
            <Text>
              <MaterialCommunityIcons name="timer" size={25} color="#ffff" />              
              {/* <Text style={{fontSize: 20, color: "#ffff"}}>00:00</Text> */}
            </Text>
          </Right>
        </Header>
        <Content padder>
          <View>
            {
              res.map((item, index)=>{
                return(
                  <View style={{maxHeight: 500, padding: 10, marginBottom: 10 }}>
                    <View>
                      <Text style={styles.textSoal}>{item.number}. {item.description}</Text>
                    </View>
                    <View>
                      {
                        item.options.map((item, index) =>
                        {
                          switch (index){
                            case 0:
                              return (<Text>A . {item}</Text>)
                            case 1:
                              return (<Text>B . {item}</Text>)
                            case 2:
                              return (<Text>C . {item}</Text>)
                            case 3:
                              return (<Text>D . {item}</Text>)
                            case 4:
                              return (<Text>E . {item}</Text>)
                          }
                        }
                      )}
                    </View>
                  </View>
                )
                
              })
            }           
            {/* <View style={{maxHeight: 500, padding: 10, marginBottom: 10 }}>
              <Text style={styles.textSoal}>1. Bisakah Anda bekerja di bawah tekanan?</Text>
            </View> */}
            {/* <View>
              <RadioForm
                radio_props={this.state.radio_props}
                initial={0}
                onPress={(value) => {this.setState({value:value})}}
              />
            </View> */}
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  valueText: {
    fontSize: 18,
    marginBottom: 50
  },
  headerLeftText: {
    color: "#ffff",
    fontSize: 20
  },
  textSoal: {
    fontSize: 20
  },
  info: {
    backgroundColor: '#5cb85c',
    padding: 25,
  },
  textInfo: {
    color: '#fff',
    fontSize: 15
  }
});
