import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import config from "../../../config";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import {setUser} from "../../redux/actions/actions"

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone_number: "",
      loading: false
    };
  }
  onClickListener = () => {
    this.setState({
      loading: !this.state.spinner
    });
    axios
      .post(`${config.BASE_URL}/api/v1/users`, {
        name: this.state.name,
        email: this.state.email,
        phone_number: this.state.phone_number
      })
      .then(response => {
        console.log(response.data.data[0]);
        if (response.data.status === 0) {
          this.setState({
            loading: false
          });
          alert(response.data.message[0].message);
        } else {
          this.setState({
            loading: false
          });
          this.props.dispatch(setUser(response.data.data[0]))
          this.props.navigation.navigate("App");
        }
      })
      .catch(function(error) {
        this.setState({
          loading: false
        });
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/ultraviolet/50/000000/user.png"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Siapa nama mu?"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Emailnya dong"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/ultraviolet/59/000000/phone.png"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="No telp juga dh"
            underlineColorAndroid="transparent"
            onChangeText={phone_number => this.setState({ phone_number })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          // onPress={() => this.props.navigation.navigate('App')}
          onPress={() => this.onClickListener()}
        >
          <Text style={styles.loginText}>Masuk Aje</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Form);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
