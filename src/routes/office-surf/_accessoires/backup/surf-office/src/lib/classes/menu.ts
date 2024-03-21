
export class nav_item {
  
    public name: string = '';
    public icon: string = '';
    public url:  string = '';

    constructor(name: string, url: string, icon: string) {
        this.name = name;
        this.icon = icon;
        this.url  = url;
    }

}