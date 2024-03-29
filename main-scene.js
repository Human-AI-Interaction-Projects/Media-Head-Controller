

window.HCI209BK2 = window.classes.HCI209BK2 =
class HCI209BK2 extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   )


        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,0,5 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
        context.set_size([300,300])
        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );


        const shapes = { box:   new Cube(),
                         box_2: new Cube2(),
                         axis:  new Axis_Arrows(),
                         Spikeball: new Spikeball(),
                         ball: new Subdivision_Sphere(4),
                         square: new Square(),

                       }
        this.submit_shapes( context, shapes );

        this.materials =
          { phong: context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ) ),
            creeper: context.get_instance( Phong_Shader ).material(Color.of(0,0,0,1),{ambient:1, texture: context.get_instance("assets/creeper.png",true)}),
            creeper_s: context.get_instance( Phong_Shader ).material(Color.of(0,0,0,1),{ambient:1, texture: context.get_instance("assets/creeper_side.png",true)}),
          }

        this.lights = [ new Light( Vec.of( -5,5,5,1 ), Color.of( 0,1,1,1 ), 100000 ) ];

        this.time_state = 0;
        context.globals.graphics_state.camera_transform = Mat4.inverse(Mat4.translation([2.5,-2.2,20]));
      }
    make_control_panel()
      {
      }
    display( graphics_state )
      { graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
        const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;

        let box1_rotate = this.time_state*Math.PI;
        let box1_model = Mat4.identity().times(Mat4.translation([-2,0,0])).times(Mat4.rotation(box1_rotate,[1,0,0])).times(Mat4.scale([2,2,2]))
        let face_model = Mat4.rotation(window.new_rot[1],[0,1,0]).times(Mat4.rotation(window.new_rot[0],[1,0,0])).times(Mat4.scale([2,2,2]))
        this.shapes.box.draw(graphics_state,face_model,this.materials.creeper_s);
        this.shapes.square.draw(graphics_state,face_model.times(Mat4.translation([0,0,1.01])),this.materials.creeper);

      }
  }
