import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Image } from 'react-native';
import { connect } from "react-redux";
import { get_users } from "../store/action";
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from "react-hook-form";

function Home(props) {
    useEffect(() => {
        props.get_users();
    }, []);
    const [users, setUsers] = useState([])
    // console.log("===>", props?.users)
    const { register, control, handleSubmit, errors } = useForm();
    const [search, setSearch] = useState(
        {
            filter: '',
            data: props.users

        }
    )

    const handleChange = (event) => {
        setSearch(
            {
                ...search,
                filter: event.filter
            });

    };
    const { filter, data } = search;

    const lowercasedFilter = filter.toLowerCase();
    const filteredData = props.users.filter(item => {
        return item.name.first.toLowerCase().includes(lowercasedFilter) || !lowercasedFilter;
    });
    return (
        <ScrollView>
            <View style={styles.container} >
                <View style={{ display: 'flex', flexDirection: 'row' ,justifyContent:'space-between'}}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              placeholder="Seach for User"
                            />
                            )}
                        name="filter"
                        defaultValue=""


                    />
                    <Text style={{ marginLeft:30, backgroundColor: 'green', padding: 5, borderRadius: 5 }} onPress={handleSubmit(handleChange)} >Search</Text>
                </View>

                {filteredData.map((v, i) => {
                    // console.log("====>,", v)
                    return (
                        <View style={{margin:5,padding:5, display: 'flex', flexDirection: 'row',justifyContent:'center',alignItems:'center' }} key={i}>
                                <Image
                                style={styles.tinyLogo}
                                source={{
                                    uri: `${v.picture.thumbnail}`,
                                }}
                            /> 
                            <Text>{v.name.first} {v.name.last}    </Text>
                        
                        </View>
                    )
                })}
            </View >
        </ScrollView>


    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

const mapStateToProps = (state) => ({
    users: state.users,
})
const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(get_users())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)