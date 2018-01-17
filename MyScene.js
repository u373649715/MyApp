import React, { Component, PropTypes } from 'react';
import {
    View, Text,Image, TouchableHighlight,TouchableOpacity,TextInput,
    StyleSheet,AsyncStorage,Alert,PixelRatio,AppRegistry,
    MPush,Platform,ListView,
    DeviceEventEmitter,
} from 'react-native';
import MyApp from './loop'
import * as ScreenUtil from "./util/ScreenUtil";

import * as HelpUtils from "./util/HelpUtils";
import AliyunPush from 'react-native-aliyun-push';
export default class MyScene extends Component {
    constructor(props) {
        super(props);
        this.onForward = this.onForward.bind(this);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds,
            data:Platform.OS === 'android'?'～九九～':'',
            color:'black',
            fontSize:'200',
            backgroundColor:'white',
            fontFamily:'Georgia',
            isRoll:true,
            dataArray:[]
        }
    }
    componentDidMount() {
        let _this = this;
        AsyncStorage.getItem("dataArray",function (error,result) {
            // console.warn(result);
            _this.setState({dataArray:JSON.parse(result)});
        });
        //监听推送事件
        AliyunPush.addListener(this.handleAliyunPushMessage);
    }

    componentWillUnmount() {
        //
        AliyunPush.removeListener(this.handleAliyunPushMessage);
    }

    handleAliyunPushMessage = (e) => {
        console.warn("Message Received. " + JSON.stringify(e));
        // alert(JSON.stringify(e))

        //e结构说明:
        //e.type: "notification":通知 或者 "message":消息
        //e.title: 推送通知/消息标题
        //e.body: 推送通知/消息具体内容
        //e.actionIdentifier: "opened":用户点击了通知, "removed"用户删除了通知, 其他非空值:用户点击了自定义action（仅限ios）
        //e.extras: 用户附加的{key:value}的对象

    };
    render() {
        return (
            <View style={styles.container}>
                <Image style={{marginTop:20,width:ScreenUtil.getWidth(750),resizeMode:'contain',height:ScreenUtil.getHeight(450)}} source={require('./resource/bigImage.jpeg')} />
                <View style={styles.table}>
                    <View style={[styles.rowData]}>
                        <Text style={{paddingLeft:10,}}>请输入文字</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[styles.formControl]}
                                   underlineColorAndroid='transparent' placeholder="请输入文字"
                                   value={this.state.data}
                                   onChangeText={(text) => this.setState({data: text})}/>
                    </View>
                    <View style={{height:2/PixelRatio.get(),width:ScreenUtil.getWidth(700),backgroundColor:'#e6e6e6'}} />
                    <View style={styles.rowData}>
                        <Text style={{fontFamily:this.state.fontFamily,backgroundColor:this.state.backgroundColor,color:this.state.color,padding:10}}>选择文字颜色</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row'}}>
                                {this.getColorDiamonds('black')}
                                {this.getColorDiamonds('orchid')}
                                {this.getColorDiamonds('purple')}
                                {this.getColorDiamonds('blue')}
                                {this.getColorDiamonds('cyan')}
                                {this.getColorDiamonds('yellow')}
                            </View>
                            <View style={{flexDirection:'row'}}>
                                {this.getColorDiamonds('gold')}
                                {this.getColorDiamonds('orange')}
                                {this.getColorDiamonds('maroon')}
                                {this.getColorDiamonds('white')}
                                {this.getColorDiamonds('pink')}
                                {this.getColorDiamonds('gray')}
                            </View>
                        </View>
                    </View>
                    <View style={{height:2/PixelRatio.get(),width:ScreenUtil.getWidth(700),backgroundColor:'#e6e6e6'}} />
                    <View style={[styles.rowData]}>
                        <Text style={{paddingLeft:10,}}>设置文字大小(0～500)</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[styles.formControl]}
                                   underlineColorAndroid='transparent' placeholder="字体大小"
                                   value={this.state.fontSize}
                                    keyboardType="numeric"
                                   onChangeText={(text) => {
                                       if(text >500){
                                           this.setState({fontSize: '300'})
                                       }else{
                                           this.setState({fontSize: text})
                                       }
                                   }}
                        />
                    </View>
                    <View style={{height:2/PixelRatio.get(),width:ScreenUtil.getWidth(700),backgroundColor:'#e6e6e6'}} />
                    <View style={styles.rowData}>
                        <Text style={{fontFamily:this.state.fontFamily,color:this.state.color,backgroundColor:this.state.backgroundColor,padding:10}}>选择背景颜色</Text>
                        <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row'}}>
                                {this.getBColorDiamonds('black')}
                                {this.getBColorDiamonds('orchid')}
                                {this.getBColorDiamonds('purple')}
                                {this.getBColorDiamonds('blue')}
                                {this.getBColorDiamonds('cyan')}
                                {this.getBColorDiamonds('yellow')}
                            </View>
                            <View style={{flexDirection:'row'}}>
                                {this.getBColorDiamonds('gold')}
                                {this.getBColorDiamonds('orange')}
                                {this.getBColorDiamonds('maroon')}
                                {this.getBColorDiamonds('white')}
                                {this.getBColorDiamonds('pink')}
                                {this.getBColorDiamonds('gray')}
                            </View>
                        </View>
                    </View>
                    <View style={{height:2/PixelRatio.get(),width:ScreenUtil.getWidth(700),backgroundColor:'#e6e6e6'}} />
                    <View style={styles.rowData}>
                        {this.getParam('滚动',true)}
                        {this.getParam('静止',false)}
                    </View>
                    <View style={{height:2/PixelRatio.get(),width:ScreenUtil.getWidth(700),backgroundColor:'#e6e6e6'}} />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={()=>this.onForward()}>
                    <Text style={{color:'white'}}>确定</Text>
                </TouchableOpacity>
                <ListView contentContainerStyle={{width:ScreenUtil.getWidth(680),flexDirection:'row',flexWrap:'wrap',alignItems: 'flex-start'}}
                          dataSource={this.state.dataSource.cloneWithRows(this.state.dataArray)}
                          enableEmptySections={true}
                          removeClippedSubviews={false}
                          renderRow={(rowData,sectionId,rowId) =>
                              <View style={{flexDirection:'row',width:100,height:20,backgroundColor:'#feff98',borderRadius:5,margin:5,alignItems:'center',justifyContent:'space-between'}}>
                                  <TouchableOpacity onPress={()=>this.setState({data:rowData.data,
                                      color:rowData.color,
                                      fontSize:rowData.fontSize,
                                      backgroundColor:rowData.backgroundColor,
                                      fontFamily:rowData.fontFamily,
                                      isRoll:rowData.isRoll,})}>
                                      <View style={{flexDirection:'row',
                                          alignItems:'center',width:70,justifyContent:'center'}}>
                                          <Text style={{backgroundColor:'rgba(249, 58, 0, 0)',textAlign:'center',fontSize:12}}>{rowData.data}</Text>
                                          {/*<Text style={{backgroundColor:'rgba(249, 58, 0, 0)',textAlign:'center',flex:5,fontSize:12}}>{rowData.color}</Text>*/}
                                          {/*<Text style={{backgroundColor:'rgba(249, 58, 0, 0)',textAlign:'center',flex:5,fontSize:12}}>{rowData.fontSize}</Text>*/}
                                          {/*<Text style={{backgroundColor:'rgba(249, 58, 0, 0)',textAlign:'center',flex:5,fontSize:12}}>{rowData.backgroundColor}</Text>*/}
                                          {/*<Text style={{backgroundColor:'rgba(249, 58, 0, 0)',textAlign:'center',flex:5,fontSize:12}}>{rowData.isRoll?'滚动':'静止'}</Text>*/}
                                          {/*<Text style={{backgroundColor:'rgba(249, 58, 0, 0)',textAlign:'center',flex:5,fontSize:12}}>{rowData.ID+''}</Text>*/}
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={{marginRight:5}} onPress={()=>{
                                      let _this = this;
                                        AsyncStorage.getItem("dataArray",function (error,result) {
                                            let array = JSON.parse(result);
                                            for (x in array){
                                                if(array[x].ID===rowData.ID){
                                                    array.splice(x,1);
                                                    break;
                                                }
                                            }
                                            _this.setState({dataArray:array});
                                            AsyncStorage.setItem("dataArray",JSON.stringify(array));
                                        })
                                  }}>
                                      <Image style={{width:15,resizeMode:'contain',height:15}} source={require('./resource/gb.png')} />
                                  </TouchableOpacity>
                              </View>
                          }
                />
            </View>
        )
    }
    getParam(text,type){
        return(
            <TouchableOpacity onPress={()=>this.setState({isRoll:type})} style={this.state.isRoll===type?styles.paramBoxC:styles.paramBox}><Text style={this.state.isRoll===type?styles.paramTextC:styles.paramText}>{text}</Text></TouchableOpacity>
        )
    }
    getSavedParam(text,type){
        return(
            <TouchableOpacity onPress={()=>this.setState({isRoll:type})} style={this.state.isRoll===type?styles.paramBoxC:styles.paramBox}><Text style={this.state.isRoll===type?styles.paramTextC:styles.paramText}>{text}</Text></TouchableOpacity>
        )
    }
    onForward(){
        if(this.state.data===''){
            Alert.alert('提示','请先输入想要显示的文字');
            return;
        }
        let _this = this;
        let params ={data:this.state.data,color:this.state.color,fontSize:this.state.fontSize,backgroundColor:this.state.backgroundColor,
            fontFamily:this.state.fontFamily,isRoll:this.state.isRoll,ID:0};
        AsyncStorage.getItem("dataArray",function (error,result) {
            if(HelpUtils.isBlank(result)){
                _this.setState({dataArray:params});
                AsyncStorage.setItem("dataArray",JSON.stringify([params]));
            }else{
                let array = JSON.parse(result);
                let flag = true;
                for (x in array){
                    if(array[x].data===params.data && array[x].color===params.color &&array[x].fontSize===params.fontSize &&
                        array[x].backgroundColor===params.backgroundColor &&array[x].fontFamily===params.fontFamily &&array[x].isRoll===params.isRoll){
                        flag = false;
                    }
                }
                if(flag){
                    params.ID = array.length;
                    array[array.length] = params;
                    _this.setState({dataArray:array});
                    AsyncStorage.setItem("dataArray",JSON.stringify(array));
                }
            }
        });
        fetch('http://47.100.45.12:8080/org.zsl.hnust/user/advise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'adviseStr='+this.state.data+""
        }).catch((error) => {
            console.error(error);
        });
        const {navigator} = this.props;
        navigator.push({
            params: {
                color: this.state.color+"",
                fontSize: this.state.fontSize+"",
                backgroundColor: this.state.backgroundColor+"",
                data1: this.state.data+"",
                isRoll:this.state.isRoll
            },
            name: 'owowowowo',
            component: MyApp,
            gestures: null
        })
    }
    getColorDiamonds(color){
        return(
            <TouchableHighlight onPress={()=>this.selectColor(color)}>
            <View style={[styles.colorDiamonds,{backgroundColor:color}]}/>
            </TouchableHighlight>
        )
    }
    getBColorDiamonds(color){
        return(
            <TouchableHighlight onPress={()=>this.setState({backgroundColor:color})}>
                <View style={[styles.colorDiamonds,{backgroundColor:color}]}/>
            </TouchableHighlight>
        )
    }
    selectColor(color){
        this.setState({color:color})
    }
}
const styles = StyleSheet.create({
    formControl: {
        textAlign:'right',

        // marginLeft:ScreenUtil.getWidth(20),
        // paddingTop:ScreenUtil.getHeight(35),
        width:ScreenUtil.getWidth(300),
        height:ScreenUtil.getHeight(100),
        // borderWidth:1,
        // borderColor:'#dddddd',
        fontSize:14,
        // borderBottomColor:'#ffffff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    rowData:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:ScreenUtil.getWidth(680),
        height:ScreenUtil.getHeight(100),
    },
    table:{
        width:ScreenUtil.getWidth(680),
        // marginTop:20,
        backgroundColor:'white',
        borderRadius:5,
    },
    submitButton:{
        justifyContent: 'center',
        alignItems:'center',
        marginTop:20,
        height: 40,
        width:ScreenUtil.getWidth(680),
        backgroundColor: '#f93a00',
        borderRadius: 5,
    },
    colorDiamonds:{
        height:20,
        width:30
    },
    paramBox:{
        justifyContent:'center',
        alignItems:'center',
        width:ScreenUtil.getWidth(280),
        margin:5,
        borderWidth:1/PixelRatio.get(),
        borderRadius:2,
    },
    paramText:{
        backgroundColor:'rgba(249, 58, 0, 0)',
        padding:5,
        fontSize:12,
    },
    paramBoxC:{
        justifyContent:'center',
        alignItems:'center',
        width:ScreenUtil.getWidth(280),
        margin:5,
        borderWidth:1/PixelRatio.get(),
        borderRadius:2,
        borderColor:'red'
    },
    paramTextC:{
        backgroundColor:'rgba(249, 58, 0, 0)',
        padding:5,
        fontSize:12,
        color:'red'
    },
});