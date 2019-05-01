import { DeveloperListItem } from './developers';

export interface DefectListItem {
  id: string;
  title: string;
  dateSubmitted: string;
  description: string;
  assignedTo: DeveloperListItem;
  dateFixed: string;
  commitHashOfFix: string;
}
