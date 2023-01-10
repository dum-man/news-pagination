export interface Feed {
  nbPages: number;
  hits: {
    objectID: string;
    author: string;
    created_at: string;
    title: string;
    story_title: string;
    url: string;
  }[];
}
