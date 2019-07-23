import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Container, Header, Content, Button, Footer, FooterTab, Right, Left, Title, Icon, Body } from "native-base";

export default class Home extends Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    const data = navigation.getParam('userData', 'NO-ID');
    this.state = {
      user : data
    }
  }
  
  render() {
    return (
       <Container>
         <View style={styles.header}>
           <View style={styles.headerContent}>
           <Image
              style={styles.avatar}
              source={{
                uri:
                  "https://previews.123rf.com/images/nakigitsune111/nakigitsune1111804/nakigitsune111180400748/98894337-initial-letter-pt-with-red-black-and-has-rounded-corners.jpg"
              }}
            />
            <Text style={styles.name}>PT LOREM DOLOR SIT AMED</Text>
          </View>
        </View>
        <Content>
          <View>
            <Text>
              Anda akan diberikan 4 jenis pertanyaan Pertanyaan pertama dalam bentuk essay,kemudian multiple choice, setelah itu multi select dan terakhir live intervue
            </Text>
          </View>
        </Content>
        <Button
          full
          onPress={() => this.props.navigation.navigate("QScreen")}
          style={[
            styles.buttonContainer,
            styles.loginButton,
            { alignSelf: "center", width: '100%' }
          ]}
          >
            <Text style={styles.loginText}>Mulai</Text>
        </Button>
      </Container>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  header: {
    backgroundColor: "#00BFFF"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  petunjuk: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600"
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#696969"
  },
  bodyContent: {
    paddingTop: 40,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  menuBox: {
    backgroundColor: "#DCDCDC",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4
  },
  icon: {
    width: 60,
    height: 60
  },
  info: {
    fontSize: 22,
    color: "#696969"
  },
  buttonContainer: {
    height: 45,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // marginBottom: 20,
    // width: 150,
    // borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
