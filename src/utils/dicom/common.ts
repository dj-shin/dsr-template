import tagList from './standard/tags.json';

export const stringToTag = (tagString: string) => {
    return parseInt(tagString, 16);
};

export type TagName = keyof typeof tagList;
export type TagValue = string;
export const Tag: Record<TagName, TagValue> = tagList;
export function InverseTag(value: TagValue): TagName {
    return (Object.keys(Tag).find(k => parseInt((Tag as any)[k], 16) === parseInt(value, 16)) as any) as TagName;
}
