export type Clinic = {
    _id?: string,
    clName: string,
    clAddress: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        postcode: string,
        country: string,
    },
    clPhone: string,
    clEmailAddress: string
}