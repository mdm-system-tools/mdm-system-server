import mdmLogo from '../lib/MDM_logo.png';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md">
                <img
                    src={mdmLogo}
                    alt="MDM Logo"
                    className="size-full object-cover"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    MDM System
                </span>
            </div>
        </>
    );
}
