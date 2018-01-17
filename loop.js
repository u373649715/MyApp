/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,AsyncStorage
} from 'react-native';
import MyApp from "./App";
import * as ScreenUtil from "./util/ScreenUtil";
// let {width1, height1} = Dimensions.get('window');
export default class loop extends Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this._onLayout = this._onLayout.bind(this);
        this.state={
            data:this.props.data1,
            time:60000,
            isRoll:this.props.isRoll
        }
    }
    componentDidMount() {
    }
    //根View的onLayout回调函数
    _onLayout(event) {
        //使用大括号是为了限制let结构赋值得到的变量的作用域，因为接来下还要结构解构赋值一次
        {
            //获取根View的宽高，以及左上角的坐标值
            let {x, y, width, height} = event.nativeEvent.layout;

            // alert('通过onLayout得到的宽度：' + width+"===="+width1);//667
            // alert('通过onLayout得到的高度：' + height);//315
            scrollViewWide=width;
            let _this = this;
            let i =0;
            _this.interval && clearInterval(_this.interval);
            let eachWide = 20;//每次移动的距离
            let totalWide = 0;//移动的总距离
            if(_this.state.isRoll){
                _this.interval = setInterval(() => {
                    if(!_scroll){
                        _this.interval && clearInterval(_this.interval);
                    }
                    if(totalWide+ScreenUtil.getWidth(750)-eachWide*2 >= width ){
                        _scroll.scrollWithoutAnimationTo();

                        totalWide=0;
                        i=0;
                    }else{
                        _scroll.scrollTo({x:eachWide*i,animate:true});
                        totalWide = totalWide + eachWide;
                        i= i+1;
                    }
                },200)
            }
        }

        //通过Dimensions API获取屏幕宽高
        //
        // alert('通过Dimensions得到的宽度：' + width);
        // alert('通过Dimensions得到的高度：' + height);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{flex:1,resizeMode:'contain',}} source={require('./resource/backImage1.png')}>
                <View style={{
                     //backgroundColor:this.props.backgroundColor
                }}>
                <TouchableOpacity style={{marginTop:20,}} onPress={()=>this.goBack()}>
                    <Image style={[styles.backButtonIcon]} source={require('./resource/leftarrow.png')}/>
                </TouchableOpacity>
                </View>
                <View style={{flex:1,}} >
                <ScrollView horizontal={true} ref={(scroll)=>_scroll = scroll}
                            contentContainerStyle={{alignItems:'center',justifyContent:'center',
                                // backgroundColor:this.props.backgroundColor
                            }}>
                    <View onLayout={this._onLayout} style={{flexDirection:'row'}}>
                    <View style={{width:Dimensions.get('window').height>Dimensions.get('window').width?Dimensions.get('window').height:Dimensions.get('window').width}}/>
                    <Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'1'} >{this.state.data}</Text>
                    <View style={{width:Dimensions.get('window').height>Dimensions.get('window').width?Dimensions.get('window').height:Dimensions.get('window').width}}/>
                    </View>
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'2'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'3'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'4'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'5'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'6'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'7'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'8'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'9'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'10'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'11'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'12'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'13'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'14'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'15'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'16'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'17'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'18'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'19'} >{this.state.data}</Text>*/}
                    {/*<Text style={{fontSize:parseInt(this.props.fontSize),color:this.props.color}} key={'20'} >{this.state.data}</Text>*/}
                </ScrollView>
                </View>
                <View style={{
                    // backgroundColor:this.props.backgroundColor
                }}>
                    <TouchableOpacity style={{marginBottom:20}} onPress={()=>{alert(scrollViewWide)}}>
                        <View style={styles.backButtonIcon}/>
                    </TouchableOpacity>
                </View>
                </Image>
            </View>
        );
    }
    goBack(){
        this.interval && clearInterval(this.interval);
        const {navigator} = this.props;
        // navigator.replace({
        //     params: {
        //     },
        //     name: 'MyApp',
        //     component: MyApp,
        //     gestures: null
        // })
        navigator.pop();
    }

}
let rowList =[];
let scrollViewHigh;
let scrollViewWide;
let _scroll;
const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: 'blue',
        justifyContent:'center',
        alignItems:'center'
    },
    backButtonIcon:{
        height:25,
        width:15
    },

});