let SmithUpgrade = function( obj ) {

    this.name = obj.name
    this.code_name = obj.name.replace( / /g, '_' ).toLowerCase()
    this.img = obj.img || `smith_upgrade-${this.code_name}`
    this.desc = obj.desc

    if ( obj.flavor_text ) this.flavor_text = obj.flavor_text

    if ( obj.requires ) {
        this.requires = []
        obj.requires.forEach( requirement => {

            // if requirement HASNT been built before
            if ( !requirement.name ) {
                let required_skill = select_from_arr( Smith_Upgrades, requirement ) 
                this.requires.push( {
                    name: required_skill.name,
                    code_name: required_skill.code_name,
                    owned: required_skill.owned
                } )
            } else {
                this.requires.push( requirement )
            }
        })
    }

    this.duration = obj.duration
    this.price = obj.price
    this.owned = obj.owned || 0
    this.locked = obj.locked || 0
    this.unlock_functions = obj.unlock_functions
    // this.new = obj.new || true

    if ( obj.repeatable ) {
        this.repeatable = obj.repeatable
        this.level = obj.level || 0
        this.price_scale = obj.price_scale
        this.base_price = obj.base_price
        this.price = this.base_price * Math.pow( this.price_scale, this.level )
    }

    this.repeatable = obj.repeatable ? true : false

    obj.new == false ? this.new = false : this.new = true

    Smith_Upgrades.push( this )

}

let Smith_Upgrades = []
let smith_upgrades = [
    // SPECIAL UPGRADES
    {
        name: 'Fragility Spectacles',
        desc: 'Allows you to spot "weak spots" within the ore',
        flavor_text: 'I can see... I can FIGHT!',
        duration: 10 * SECOND,
        price: 0,
        unlock_functions: {
            unlock_fragility_spectacles: 1
        }
    }, {
        name: 'Quest Board',
        desc: 'Allows you to deploy Miners on quests for ancient artifacts!',
        flavor_text: 'Fetch quests are the greatest',
        duration: 4 * HOUR,
        price: 1, //50
        locked: 1,
        unlock_functions: {
            unlock_quest_board: 1
        }
    }, {
        name: 'A U T O M A T E R',
        desc: 'Unlocks the A U T O M A T E R',
        flavor_text: 'Check out my other game Automate the World!',
        duration: 5 * MINUTE,
        price: 100,
        locked: 1,
        unlock_functions: {
            unlock_automater: 1
        }
    },

    // REPEATABLE
    {
        name: 'Damage Up',
        desc: 'Increase pickaxe damage permanently by 1',
        flavor_text: 'More damage, more ore',
        duration: 30 * SECOND,
        base_price: 2,
        price_scale: 1.45,
        repeatable: true,
        unlock_functions: {
            increase_pickaxe_damage: 1
        }
    }, {
        name: 'Sharpness Up',
        desc: 'Increase pickaxe sharpness permanently by 5%',
        flavor_text: 'Sharpening is ez',
        duration: 30 * SECOND,
        base_price: 1,
        price_scale: 1.25,
        repeatable: true,
        unlock_functions: {
            increase_pickaxe_sharpness: 5
        }
    }, {
        name: 'Hardness Up',
        desc: 'Increase pickaxe hardness permanently by 5%',
        flavor_text: 'Reinforce that shiz',
        duration: 30 * SECOND,
        base_price: 1,
        price_scale: 1.25,
        repeatable: true,
        unlock_functions: {
            increase_pickaxe_hardness: 5
        }
    },

    {
        name: 'Combo Multiplier',
        desc: 'Adds a bonus multiplier to OpS and OpC relative to your current combo',
        flavor_text: 'The higher the better',
        duration: 1 * MINUTE,
        price: 5,
        locked: 1,
        unlock_functions: {
            increase_opc_combo_multiplier: .002,
            increase_ops_combo_multiplier: .001
        }
    },
    // COMBO SHIELD UPGRADES
    {
        name: 'Combo Shield I',
        desc: 'Unlocks a combo shield that protects your combo from a misclick',
        flavor_text: 'clink clink',
        duration: 30 * SECOND,
        price: 5,
        locked: 1,
        unlock_functions: {
            unlock_combo_shield: 1,
            unlock_smith_upgrades: [ 'combo_shield_ii', 'combo_shield_speed_up_i' ]
        }

    }, {
        name: 'Combo Shield II',
        desc: 'Unlocks a combo shield that protects your combo from a misclick',
        duration: 30 * SECOND,
        price: 30,
        locked: 1,
        requires: [ 'combo_shield_i' ],
        unlock_functions: {
            unlock_combo_shield: 1,
            unlock_smith_upgrades: [ 'combo_shield_iii' ]
        }
    }, {
        name: 'Combo Shield III',
        desc: 'Unlocks a combo shield that protects your combo from a misclick',
        duration: 30 * SECOND,
        price: 50,
        locked: 1,
        requires: [ 'combo_shield_ii'],
        unlock_functions: {
            unlock_combo_shield: 1
        }
    }, {
        name: 'Combo Shield Speed Up I',
        desc: 'Decrease the time needed for another combo shield by 1 hour',
        duration: 30 * SECOND,
        price: 50,
        locked: 1,
        requires: [ 'combo_shield_i'],
        unlock_functions: {
            combo_shield_speed_up: 1 * HOUR,
            unlock_smith_upgrades: [ 'combo_shield_speed_up_ii']
        }
    }, {
        name: 'Combo Shield Speed Up II',
        desc: 'Decrease the time needed for another combo shield by 1 hour',
        duration: 30 * SECOND,
        price: 100,
        locked: 1,
        requires: [ 'combo_shield_speed_up_i'],
        unlock_functions: {
            combo_shield_speed_up: 1 * HOUR,
            unlock_smith_upgrades: [ 'combo_shield_speed_up_iii']
        }
    }, {
        name: 'Combo Shield Speed Up III',
        desc: 'Decrease the time needed for another combo shield by 1 hour',
        duration: 30 * SECOND,
        price: 150,
        locked: 1,
        requires: [ 'combo_shield_speed_up_ii'],
        unlock_functions: {
            combo_shield_speed_up: 1 * HOUR
        }
    },

    // INCREASE GOLD NUGGET FREQUENCY
    {
        name: 'Gold Nuggies Frequency I',
        desc: 'Increase the spawn rate of gold nuggets',
        duration: 10 * SECOND,
        price: 15,
        locked: 1,
        unlock_functions: {
            increase_gold_nugget_spawn_rate: 10
        }
    }, {
        name: 'Gold Nuggies Frequency II',
        desc: 'Increase the spawn rate of gold nuggets',
        duration: 10 * SECOND,
        price: 25,
        locked: 1,
        unlock_functions: {
            increase_gold_nugget_spawn_rate: 10
        }
    }, {
        name: 'Gold Nuggies Frequency III',
        desc: 'Increase the spawn rate of gold nuggets',
        duration: 10 * SECOND,
        price: 35,
        locked: 1,
        unlock_functions: {
            increase_gold_nugget_spawn_rate: 10
        }
    },

    // INCREASE GOLD NUGGET SPAWN RATE
    {
        name: 'Gold Nuggies Chance Up I',
        desc: 'Increases the chance of a gold nugget spawning',
        duration: 10 * SECOND,
        price: 15,
        locked: 1,
        unlock_functions: {
            increase_gold_nugget_chance_of_spawn: 10
        }
    }, {
        name: 'Gold Nuggies Chance Up II',
        desc: 'Increases the chance of a gold nugget spawning',
        duration: 10 * SECOND,
        price: 25,
        locked: 1,
        unlock_functions: {
            increase_gold_nugget_chance_of_spawn: 10
        }
    }, {
        name: 'Gold Nuggies Chance Up III',
        desc: 'Increases the chance of a gold nugget spawning',
        duration: 10 * SECOND,
        price: 35,
        locked: 1,
        unlock_functions: {
            increase_gold_nugget_chance_of_spawn: 10
        }
    }, 

    // ORE WAREHOUSE UPGRADES
    {
        name: 'Reinforced Warehouse',
        desc: 'Increases maximum away storage by 3 hours',
        duration: 30 * SECOND,
        price: 3,
        unlock_functions: {
            increase_max_ore_away_gain: 3 * HOUR,
            unlock_smith_upgrades: [ 'fortified_warehouse' ]
        }
    }, {
        name: 'Fortified Warehouse',
        desc: 'Increases maximum away storage by 4 hours',
        duration: 1 * MINUTE,
        price: 10,
        locked: 1,
        requires: [ 'reinforced_warehouse' ],
        unlock_functions: {
            increase_max_ore_away_gain: 4 * HOUR,
            unlock_smith_upgrades: [ 'warehouse_expansion' ]
        }
    }, {
        name: 'Warehouse Expansion',
        desc: 'Increase maximum away storage by 8 hours',
        duration: 3 * MINUTE,
        price: 40,
        locked: 1,
        requires: [ 'fortified_warehouse' ],
        unlock_functions: {
            increase_max_ore_away_gain: 8 * HOUR,
            unlock_smith_upgrades: [ 'double_decker_warehouse' ]
        }
    }, {
        name: 'Double Decker Warehouse',
        desc: 'Increase maximum away storage by 8 hours',
        duration: 5 * MINUTE,
        price: 100,
        locked: 1,
        requires: [ 'warehouse_expansion' ],
        unlock_functions: {
            increase_max_ore_away_gain: 8 * HOUR,
            unlock_smith_upgrades: [ 'infinity_warehouse' ]
        }
    }, {
        name: 'Infinity Warehouse',
        desc: 'Increase maximum away storage to infinity',
        duration: 10 * MINUTE,
        price: 1000,
        locked: 1,
        requires: [ 'double_decker_warehouse' ],
        unlock_functions: {
            increase_max_ore_away_gain: 'infinity'
        }
    }, {
        name: 'Warehouse Supervisor',
        desc: 'Increases away gain percentage by 15%',
        duration: 30 * SECOND,
        price: 5,
        unlock_functions: {
            increase_away_gain_percentage: .15,
            unlock_smith_upgrades: [ 'warehouse_watchdogs' ]
        }
    }, {
        name: 'Warehouse Watchdogs',
        desc: 'Increases away gain percentage by 15%',
        duration: 1 * MINUTE,
        price: 20,
        locked: 1,
        requires: [ 'warehouse_supervisor' ],
        unlock_functions: {
            increase_away_gain_percentage: .15,
            unlock_smith_upgrades: [ 'warehouse_overseer' ]
        }
    }, {
        name: 'Warehouse Overseer',
        desc: 'Increases away gain percentage by 20%',
        duration: 3 * MINUTE,
        price: 100,
        locked: 1,
        requires: [ 'warehouse_watchdogs' ],
        unlock_functions: {
            increase_away_gain_percentage: .2,
            unlock_smith_upgrades: [ 'warehouse robotics' ]
        }
    }, {
        name: 'Warehouse Robotics',
        desc: 'Increases away gain percentage to 100%',
        duration: 5 * MINUTE,
        price: 1000,
        locked: 1,
        requires: [ 'warehouse_overseer' ],
        unlock_functions: {
            increase_away_gain_percentage: 1
        }
    }
]

let unlock_smith_upgrade = ( code_name ) => {
    let upgrade = select_from_arr( Smith_Upgrades, code_name )
    upgrade.locked = 0

    build_smith_upgrades( true )
}

// smith_upgrades.forEach( upgrade => new SmithUpgrade( upgrade ) )

let load_smith_upgrades = () => {

    return new Promise( resolve => {

        Smith_Upgrades = []
        let base_smith_upgrades = smith_upgrades

        if ( localStorage.getItem( 'smith_upgrades' ) ) {
            base_smith_upgrades = JSON.parse( localStorage.getItem( 'smith_upgrades' ) )
        }

        base_smith_upgrades.forEach( u => new SmithUpgrade( u ))

        resolve()

    })

}
