import { Component as ClassComponent, Emit, Inject, Mixins, Model, Prop, Provide, Watch } from 'vue-property-decorator'
import { Component as TSXComponent } from 'vue-tsx-support'

class Component<Props, Events = {}, ScopedSlotArgs = {}> extends TSXComponent<Props, Events, ScopedSlotArgs> {
  public $props!: Props
}

export {
  ClassComponent,
  Component,
  Mixins,
  Prop,
  Emit,
  Model,
  Watch,
  Provide,
  Inject,
}
