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
import { View, StyleSheet, FlatList, SectionList, TouchableOpacity, Button ,TextInput} from "react-native";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import RadioGroup from "react-native-radio-buttons-group";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import RadioButtons from "./RadioButtons";
import { setQuiz, updateQuizRadio, updateCurrentQuestionPlus, updateCurrentQuestionMinus, updateQuizText, updateQuizRadioMulti } from "../../redux/actions/actions";
import { connect } from "react-redux";
import config from "../../../config";
import axios from "axios";


class QScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  componentDidMount(){
      axios
      .get(`${config.BASE_URL}/api/v1/questions`)
      .then(response => {
        this.props.dispatch(setQuiz(response.data.data))
        // console.log(response)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  clickRadio = (number, indexRadio) => {
    this.props.dispatch(updateQuizRadio(number, indexRadio))
  }
  clickRadioMulti = (number, indexRadio) => {
    this.props.dispatch(updateQuizRadioMulti(number, indexRadio))
  }
  next = () => {
    this.props.dispatch(updateCurrentQuestionPlus(1))
  }
  previous = () => {
    this.props.dispatch(updateCurrentQuestionMinus(1))
  }
  updateText = (number,text) => {
    this.props.dispatch(updateQuizText(number,text))
  }
  handleFinish = () => {
    // alert('asg')
    axios
      .post(`${config.BASE_URL}/api/v1/answers`, {
        data: this.props.quiz.quiz,
        user: this.props.user.user
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
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
            <Text style={styles.textInfo}>Section {this.props.quiz.currentQ} Of {this.props.quiz.quiz.length}</Text>
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
          {this.props.quiz.quiz.filter((data) => {
            return data.number == this.props.quiz.currentQ
          }).map((quiz) => {
            switch(quiz.type){
              case 'multiple choice':
                return(
                  <View key ={quiz.number}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{padding: 10}}>
                        <Text>{quiz.number}</Text>
                      </View>
                      <View style={{flex: 1,padding: 10}}>
                        <Text>{quiz.description}</Text>
                      </View>
                    </View>
                    {
                      quiz.options.map((item2, index2) => {
                        return (
                          <View key={index2} style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.clickRadio(quiz.number, index2)} style={[styles.circle, {padding: 10}]} >
                              { index2 === quiz.checked && (<View style={styles.checkedCircle} />) }
                            </TouchableOpacity>
                            <View style={{flex: 1, padding: 10}}>
                              <Text>{item2}</Text>
                            </View>
                          </View>
                        )
                      })
                    }
                    {
                      this.props.quiz.currentQ < this.props.quiz.quiz.length ? 
                      (<Button title="Next" onPress={this.next}></Button>)
                      :
                      (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                              <Button title="Finish" onPress={this.handleFinish}></Button>
                            </View>
                            <View style={{flex:1}}>
                              <Button title="Previous" onPress={this.previous}></Button>
                            </View>
                          </View>
                      )
                    }
                  </View>

                )
                break
                case 'text':
                  return(
                    <View key ={quiz.number}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 10}}>
                          <Text>{quiz.number}</Text>
                        </View>
                        <View style={{flex: 1,padding: 10}}>
                          <Text>{quiz.description}</Text>
                        </View>
                        
                      </View>
                      <View>
                          <TextInput 
                            style = {styles.input}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.updateText(quiz.number,text)}
                            value={quiz.value}/>
                        </View>
                      {
                        this.props.quiz.currentQ < this.props.quiz.quiz.length ? 
                        (<Button title="Next" onPress={this.next}></Button>)
                        :
                        (
                          <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                              <Button title="Finish" onPress={this.handleFinish}></Button>
                            </View>
                            <View style={{flex:1}}>
                              <Button title="Previous" onPress={this.previous}></Button>
                            </View>
                          </View>
                        )
                      }
                    </View>

                  )
                break
                case 'multi select':
                return(
                  <View key ={quiz.number}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{padding: 10}}>
                        <Text>{quiz.number}</Text>
                      </View>
                      <View style={{flex: 1,padding: 10}}>
                        <Text>{quiz.description}</Text>
                      </View>
                    </View>
                    {
                      quiz.options.map((item2, index2) => {
                        return (
                          <View key={index2} style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.clickRadioMulti(quiz.number, index2)} style={[styles.circle, {padding: 10}]} >
                              { quiz.checked.includes(index2) && (<View style={styles.checkedCircle} />)}
                              {/* { index2 === quiz.checked && (<View style={styles.checkedCircle} />) } */}
                            </TouchableOpacity>
                            <View style={{flex: 1, padding: 10}}>
                              <Text>{item2}</Text>
                            </View>
                          </View>
                        )
                      })
                    }
                    {
                      this.props.quiz.currentQ < this.props.quiz.quiz.length ? 
                      (<Button title="Next" onPress={this.next}></Button>)
                      :
                      (
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                              <Button title="Finish" onPress={this.handleFinish}></Button>
                            </View>
                            <View style={{flex:1}}>
                              <Button title="Previous" onPress={this.previous}></Button>
                            </View>
                          </View>
                      )
                    }
                  </View>

                )
                break
            }
          })
        }
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    user: state.auth
  };
};
export default connect(mapStateToProps)(QScreen);
const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
  },
checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
},
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
