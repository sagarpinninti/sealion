using { myns } from '../db/datamodel';
service MyService {
    
entity threatinfoSet as projection on myns.threatinfo;
}