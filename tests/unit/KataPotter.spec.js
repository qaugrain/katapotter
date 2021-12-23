import { shallowMount } from '@vue/test-utils'
import KataPotter from '@/components/KataPotter.vue'

describe('App', () => {
    it('testBasics', function() {
        const wrapper = shallowMount(KataPotter, {})

        expect(wrapper.vm.calculatePrice([])).toBe(0);
        expect(wrapper.vm.calculatePrice(["second book"])).toBe(8);
        expect(wrapper.vm.calculatePrice(["third book"])).toBe(8);
        expect(wrapper.vm.calculatePrice(["fourth book"])).toBe(8);
        expect(wrapper.vm.calculatePrice(["fifth book"])).toBe(8);
        expect(wrapper.vm.calculatePrice(["second book", "second book", "second book"])).toBe(8 * 3);
    });

    it('testSimpleDiscounts', function() {
        const wrapper = shallowMount(KataPotter, {})

        expect(wrapper.vm.calculatePrice(["first book", "second book"])).toBe(8 * 2 * 0.95);
        expect(wrapper.vm.calculatePrice(["first book", "third book", "fifth book"])).toBe(8 * 3 * 0.9);
        expect(wrapper.vm.calculatePrice(["first book", "second book", "third book", "fifth book"])).toBe(8 * 4 * 0.8);
        expect(wrapper.vm.calculatePrice(["first book", "second book", "third book", "fourth book", "fifth book"])).toBe(8 * 5 * 0.75);
    });

    it('testSeveralDiscounts', function() {
        const wrapper = shallowMount(KataPotter, {})

        expect(wrapper.vm.calculatePrice(["first book", "first book", "second book"])).toBe(8 + (8 * 2 * 0.95));
        expect(wrapper.vm.calculatePrice(["first book", "first book", "second book", "second book"])).toBe(2 * (8 * 2 * 0.95));
        expect(wrapper.vm.calculatePrice(["first book", "first book", "second book", "third book", "third book", "fourth book"])).toBe((8 * 4 * 0.8) + (8 * 2 * 0.95));
        expect(wrapper.vm.calculatePrice(["first book", "second book", "second book", "third book", "fourth book", "fifth book"])).toBe(8 + (8 * 5 * 0.75));
    });

    it('testEdgeCases', function() {
        const wrapper = shallowMount(KataPotter, {})

        expect(wrapper.vm.calculatePrice(["first book", "first book", "second book", "second book", "third book", "third book", "fourth book", "fifth book"])).toBe(2 * (8 * 4 * 0.8));
        expect( 
            wrapper.vm.calculatePrice(["first book", "first book", "first book", "first book", "first book", 
                "second book", "second book", "second book", "second book", "second book", 
                "third book", "third book", "third book", "third book", 
                "fourth book", "fourth book", "fourth book", "fourth book", "fourth book", 
                "fifth book", "fifth book", "fifth book", "fifth book"])).toBe(3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8));
    });
});
