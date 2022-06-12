
// Convert an object to a type. in this case forms a type of the object but it can be any type
export default class FormDataToType {
    public static toType<T>(obj: any): T {
        //convert from entries to type ??? anti-pattern ?? codeSmell. but is works for now
        return <T>Object.fromEntries(obj);
    }
}