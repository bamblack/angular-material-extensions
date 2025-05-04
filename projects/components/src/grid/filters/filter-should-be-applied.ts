export function filterShouldBeApplied(val: any): boolean {
    if (val == null || val === '') return false;

    if (Array.isArray(val)) {
        return val.length > 0;
    }

    return true;
}
