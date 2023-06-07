import { Injectable } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilePreviewService {

	includeColumnNames: boolean = true;
	fileName: string|undefined = undefined;
	fileData: string[]|null = null; 

	previewColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	previewData$: BehaviorSubject<MatTableDataSource<string>> = 
		new BehaviorSubject<MatTableDataSource<string>>(
			new MatTableDataSource<string>([])
		);
  
	constructor() {}

	public loadFile(file: File): void{
		if (file === null) return;
		const reader = new FileReader();
		this.fileName = file.name;
		
		reader.onload = (data:any) => {
			const text = data.target.result as string;
			this.fileData = text.trim().split('\n');
			this.parsePreview();
		}
		reader.onerror = (error: any) => {
			this.fileData = null;
		}
		reader.readAsText(file);
	}

	public toogleIncludeColumnNames(){
		this.includeColumnNames = !this.includeColumnNames;
		this.parsePreview();
	}

	public parsePreview(){
		if(this.fileData === null){
			this.previewColumns$.next([]);
			this.previewData$.next(new MatTableDataSource<string>([]));
			return;
		};
		if(this.includeColumnNames){
			this.previewColumns$.next(this.fileData[0].split(','));
			this.previewData$.next(new MatTableDataSource(this.fileData.slice(1,5)));
		}
		else{
			const n = this.fileData[0].split(',').length;
			this.previewColumns$.next([ ...Array(n)].map((_, i) => `Column ${i}`));
			this.previewData$.next(new MatTableDataSource(this.fileData.slice(0,4)));
		}
	}

	
}
