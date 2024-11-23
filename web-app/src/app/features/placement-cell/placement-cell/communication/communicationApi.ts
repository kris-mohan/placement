import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiHttpService } from "src/app/services/api-services/api-http-services";
import { Batch } from "src/app/services/types/Batch";
import { Course } from "src/app/services/types/Course";
import { Messages } from "src/app/services/types/Messages";
import { ODataEntity } from "src/app/services/types/OData";
import { Tblstudent } from "src/app/services/types/Tblstudent";

@Injectable({
  providedIn: "root",
})
export class CommuicationApiService {
  constructor(private apiHttpService: ApiHttpService) {}

  GetAllBatches(): Observable<ODataEntity<Batch[]>> {
    return this.apiHttpService.get<ODataEntity<Batch[]>>(`/Batch`);
  }

  GetAllCourses(): Observable<ODataEntity<Course[]>> {
    return this.apiHttpService.get<ODataEntity<Course[]>>(`/Course`);
  }

  GetStudentByBatch(batchId: string): Observable<ODataEntity<Tblstudent[]>> {
    return this.apiHttpService.get<ODataEntity<Tblstudent[]>>(
      `/Tblstudent?$filter=BatchId eq ${batchId}&$select=Id,FirstName,LastName`
    );
  }

  SendMessage(chat: any): Observable<any> {
    return this.apiHttpService.post<any>(`/Chats`, chat);
  }

  GetRecentChats(userId: any): Observable<ODataEntity<Messages[]>> {
    return this.apiHttpService.get<ODataEntity<Messages[]>>(
      `/Chats?$expand=Messages($filter=(SenderId eq ${userId} or ReceiverId eq ${userId});$orderby=CreatedDate desc;$expand=Sender($select=UserName),Receiver($select=UserName))`
    );
  }

  SendNewMessages(chatId: number, data: any): Observable<any> {
    return this.apiHttpService.patch<any>(`/Chats?key=${chatId}`, data);
  }
  

  
}
