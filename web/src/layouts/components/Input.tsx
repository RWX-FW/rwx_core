type Props = {
    icon: React.ReactNode,
    header: string,
    description: string,
    children: React.ReactNode
}

const InputHeader = (props: Props) => {
  return (
    <div className='flex flex-col w-full gap-2'>
        <div className='flex gap-6 items-center'>
            {props.icon}
            <div className='flex flex-col -space-y-2'>
                <span className='font-semibold text-md'>{props.header}</span>
                <span className='text-sm text-foreground/70'>{props.description}</span>
            </div>
        </div>
        {props.children}
    </div>
  )
}

export default InputHeader