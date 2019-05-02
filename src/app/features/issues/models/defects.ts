export interface DefectListItem {
  id: string;
  title: string;
  dateSubmitted: string;
  description: string;
  assignedTo: string;
  dateFixed: string;
  commitHashOfFix: string;
}
