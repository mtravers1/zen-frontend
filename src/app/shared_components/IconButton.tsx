export default function IconButton({ label, link, children }: { label: string; link: string; children: React.ReactNode; }) {

    return (
        <div className="bg-white rounded-full">
            <a className="object-contain" aria-label={label} href={link}>
                {children}
            </a>
        </div>
    );
}