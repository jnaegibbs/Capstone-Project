const state = {
    token:'',
    user:{

        cart:[],
        order:[],
        profile:[{
            
            name:'',
            email:'',
            phoneNumber:null,
            address:''

        }]


    }
}

export const testUseAppSelector = (f) => f(state);