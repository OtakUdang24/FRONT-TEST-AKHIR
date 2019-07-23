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