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
import { setTimer,updateCurrentQuestionSatu,setQuiz, updateQuizRadio, updateCurrentQuestionPlus, updateCurrentQuestionMinus, updateQuizText, updateQuizRadioMulti } from "../../redux/actions/actions";
import { connect } from "react-redux";
import config from "../../../config";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

class QScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: false,
      minutes: 0,
      seconds: 0,
      countDown: 0
    };
  }
  async componentDidMount(){
    try{
      const result = await axios.get(`${config.BASE_URL}/api/v1/questions`);
      this.props.dispatch(setQuiz(result.data.data))
      this.props.dispatch(setTimer())
    }catch(error){
      console.log(error)
    }
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    
    this.interval = setInterval(() => {
      let now = new Date().getTime(),
        distance = this.props.quiz.countDown - now;
      this.setState({
        minutes: Math.floor((distance % hour) / minute),
        seconds: Math.floor((distance % minute) / second)
      });

      if(this.state.seconds === 0 && this.state.minutes === 0){
        if(this.props.quiz.currentQ < this.props.quiz.quiz.length){
          this.props.dispatch(updateCurrentQuestionPlus(1)) 
          this.props.dispatch(setTimer())
          this.setState({
            countDown: currentTime.setTime(currentTime.getTime() + 1000 * 60 * this.props.quiz.timer)
          })
        }else{
          this.setState({
            loading: true
          });
          axios
            .post(`${config.BASE_URL}/api/v1/answers`, {
              data: this.props.quiz.quiz,
              user: this.props.user.user
            })
            .then(response => {
              this.setState({
                loading: false
              });
              alert("Berhasil Horee")
              this.props.dispatch(updateCurrentQuestionSatu(1))
              this.props.navigation.navigate("Form");
            })
            .catch(function(error) {
              this.setState({
                loading: false
              });
              console.log(error);
            });
        }
        
      }
    }, second);
  }
  
  clickRadio = (number, indexRadio) => {
    this.props.dispatch(updateQuizRadio(number, indexRadio))
  }
  clickRadioMulti = (number, indexRadio) => {
    this.props.dispatch(updateQuizRadioMulti(number, indexRadio))
  }
  next = () => {
    this.props.dispatch(updateCurrentQuestionPlus(1)) 
    this.props.dispatch(setTimer())
  }
  previous = () => {
    this.props.dispatch(updateCurrentQuestionMinus(1))
  }
  updateText = (number,text) => {
    this.props.dispatch(updateQuizText(number,text))
  }
  handleFinish = () => {
    this.setState({
      loading: true
    });
    axios
      .post(`${config.BASE_URL}/api/v1/answers`, {
        data: this.props.quiz.quiz,
        user: this.props.user.user
      })
      .then(response => {
        this.setState({
          loading: false
        });
        alert("Berhasil Horee")
        this.props.dispatch(updateCurrentQuestionSatu(1))
        this.props.navigation.navigate("Form");
        // console.log(response.data);
      })
      .catch((error) => {
        this.setState({
          loading: false
        });
        console.log(error);
      });
  }
  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <Header style={{ backgroundColor: "#00b5ec" }} >
          <Body>
            <Text style={styles.headerLeftText}>
              Question 
            </Text>
          </Body>
          {/* <Right>
            <Text>
              <Ionicons name="md-close" size={30} color="#ffff" />
            </Text> 
          </Right> */}
        </Header>
        <Header style={{ backgroundColor: "#5cb85c" }} >
          <View style={{marginTop: 16}}>
            <Text style={styles.textInfo}>Section {this.props.quiz.currentQ} Of {this.props.quiz.quiz.length}</Text>
          </View>
          <Body />
          <Right>
            <Text>
              <MaterialCommunityIcons name="timer" size={25} color="#ffff" />              
              <Text style={{fontSize: 20, color: "#ffff"}}>{this.state.minutes}:{this.state.seconds}</Text>
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
