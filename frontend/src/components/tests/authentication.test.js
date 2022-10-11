import Userfront from "@userfront/react";
Userfront.init("xbrr9qdb");

describe("USERFRONT", () => {
    test('userFront Login',async () => {
        await Userfront.login({
            method: 'password', 
            email: 'thanh@gmail.com', 
            password: 'thanh2001'
        })
    
        let expected = {
            "email": "thanh@gmail.com",
            "phoneNumber": null,
            "username": "divine-breeze-oa4nb1",
            "name": "Thanh",
            "image": "https://res.cloudinary.com/component/image/upload/avatars/avatar-plain-4.png",
            "data": {},
            "confirmedAt": null,
            "createdAt": "2022-10-09T08:34:32.151Z",
            "updatedAt": "2022-10-09T08:34:32.151Z",
            "mode": "test",
            "userId": 10,
            "userUuid": "061bba48-4634-4203-8fac-76bff665554e",
            "tenantId": "xbrr9qdb",
            "isConfirmed": false
        }
    
        let res = JSON.stringify(Userfront.user, null, 7);
        res = res.replace(/\s/g, "");
        expected = JSON.stringify(expected);
    
    
        expect(res).toBe(expected);
    })
    
    
    test("userFront Logout", async () => {
        await Userfront.login({
            method: 'password', 
            email: 'thanh@gmail.com', 
            password: 'thanh2001'
        })
    
        await Userfront.logout(); 
        let res = JSON.stringify(Userfront.user, null, 7);
        const expected = "{}";
    
        expect(res).toBe(expected);
    })

    test("userFront Role", async () => {
        await Userfront.login({
            method: 'password', 
            email: 'thanh@gmail.com', 
            password: 'thanh2001'
        })
         
        let res = JSON.stringify(Userfront.user, null, 7);
        res = res.replace(/\s/g, "");
        expect((Userfront.user.hasRole('admin')));
    })

    // test("userFront signUp", async () => {
    //     await Userfront.signup({
    //         method: "password",
    //         email: "nj1@example.com",
    //         name: "NJ",
    //         username: "NJNguyen",
    //         password: "Mangolele2001",
    //     });
    
    
    //     await Userfront.user.update({
    //         name: "NJ Nguyen",
    //     });
    
    //     let res = JSON.stringify(Userfront.user,null, 8); 
    //     let expected = {
    //         "email": "nj1@example.com",
    //         "phoneNumber": null,
    //         "username": "njnguyen",
    //         "name": "NJ Nguyen",
    //         "image": "https://res.cloudinary.com/component/image/upload/avatars/avatar-plain-6.png",
    //         "data": {},
    //         "confirmedAt": null,
    //         "mode": "test",
    //         "userId": 9,
    //         "userUuid": "6139925d-2f1e-4ab7-b577-0fced35b0209",
    //         "tenantId": "xbrr9qdb",
    //         "isConfirmed": false
    // }
    //     expected = JSON.stringify(expected);
    
    //     expect(res).toBe(expected);
    // })
})
