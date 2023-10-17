import { UabComponent } from '../common/component';
UabComponent({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular',
        },
        size: String,
        textSize: String,
    },
    data: {
        array12: Array.from({ length: 12 }),
    },
});
