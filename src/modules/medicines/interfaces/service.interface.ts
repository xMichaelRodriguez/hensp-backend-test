/* eslint-disable prettier/prettier */
import Medicine from '../entities/medicines.entity';

export interface IServiceIg {
  data: Medicine[];
  paging: IServicePaging;
}

export interface IServicePaging {
  cursors: ICursors;
  next: string;
  prev: string;
}

interface ICursors {
  before: string;
  after: string;
}


