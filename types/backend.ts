export interface PersonalDetails {
    firstName: string
    lastName: string
    phoneNo: string
    email: string
    linkedin: string
    github: string
}

export interface Education {
    map: { [key: string]: string }
    cllgName: string
    course: string
    location: string
    year: string

}