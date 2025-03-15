import IconButton from "./IconButton";

export function IconBar() {
    const icons = [];
    icons.push({ "source": "icons8-facebook.svg", "link": "www.facebook.com", "label": "facebook" });
    icons.push({ "source": "icons8-facebook.svg", "link": "www.facebook.com", "label": "facebook" });
    icons.push({ "source": "icons8-facebook.svg", "link": "www.facebook.com", "label": "facebook" });
    const rows = [];
    for (let i = 0; i < icons.length; i++) {
        rows.push(<IconButton key={i} source={(icons[i].source)} link={icons[i].link} label={icons[i].label} />);
    }
    return (
        <div className="flex gap-0.5">
            {rows}
        </div>
    );
}